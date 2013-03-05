/*global SA_CONFIG, _ */
(function () {
  'use strict';

  var LOCALESTORAGE_KEY = 'soccerapp',
    DATA_REVISION = 1;

  angular.module('soccerApp')
    .factory('appStorage', function () {
      var loadedData = localStorage.getItem(LOCALESTORAGE_KEY),
        save = function () {
          localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(store));
        },
        defaultData = {
          teams: ['BVB', 'Bayern München', 'HSV'],
          results: [{
            teamHome: 'BVB',
            teamAway: 'HSV',
            goalsHome: 2,
            goalsAway: 1
          }],
          scores: {},
          revision: DATA_REVISION
        },
        store;

      if (loadedData) {
        store = JSON.parse(loadedData);
        if (store.revision < DATA_REVISION) {
          console.log('Dropping obsolete local storage data.');
          store = null;
        }
      }

      store = store || defaultData;

      return {
        getTeams: function () {
          return store.teams || [];
        },

        setTeams: function (teams) {
          store.teams = teams;
          save();
        },

        getResults: function () {
          return store.results;
        },

        setResults: function (results) {
          store.results = results;
          save();
        },

        getScores: function () {
          return store.scores;
        },

        getScoresSorted: function () {
          return _.pairs(store.scores).sort(function (a, b) { return b[1] - a[1]; });
        },

        setScores: function (scores) {
          store.scores = scores;
          save();
        },

        setErrors: function (errors) {
          angular.forEach(errors, function (value, i) {
            store.results[i].error = value;
          });
          save();
        },

        clear: function () {
          store = defaultData;
          save();
        },

        toJSON: function () {
          return store;
        }
      };
    })

    .factory('scoreResource', function ($resource) {
      return $resource('https://:host/v1/score', {
        host: SA_CONFIG.apiHost
      }, {
        get: {method: 'post'}
      });
    })

    // I really suck at naming things.
    // This populates the `appStorage` with calculations from
    // the server.
    .factory('remoteScoreCalculator', function ($q, appStorage, scoreResource) {
      var onResponse = function (deferred) {
        return function (response) {
          appStorage.setScores(response.scores);
          appStorage.setErrors(response.errors);

          deferred.resolve(response);
        };
      }, onError = function (deferred) {
        return function (err) {
          deferred.reject(err);
        };
      };

      return {
        update: function () {
          var deferred = $q.defer();
          scoreResource.get({results: appStorage.getResults()},
                             onResponse(deferred), onError(deferred));

          return deferred.promise;
        }
      };
    });
}());
