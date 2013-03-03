/*global SA_CONFIG */
(function () {
  'use strict';

  angular.module('soccerApp')
    .factory('appStorage', function () {
      var store = {
        teams: ['BVB', 'Bayern München', 'HSV'],
        results: [{
          teamHome: 'BVB',
          teamAway: 'HSV',
          goalsHome: 2,
          goalsAway: 1
        }],
        scores: {}
      };

      return {
        getTeams: function () {
          return store.teams || [];
        },

        setTeams: function (teams) {
          store.teams = teams;
        },

        getResults: function () {
          return store.results;
        },

        setResults: function (results) {
          store.results = results;
        },

        getScores: function () {
          return store.scores;
        },

        setScores: function (scores) {
          store.scores = scores;
        },

        setErrors: function (errors) {
          angular.forEach(errors, function (value, i) {
            store.results[i].error = value;
          });
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
