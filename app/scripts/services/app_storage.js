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

        toJSON: function () {
          return store;
        }
      };
    })

    .factory('scoreResource', function ($resource) {
      return $resource('http://:host:port/v1/score', {
        host: SA_CONFIG.apiHost,
        port: ':' + SA_CONFIG.apiPort
      });
    })

    // I really suck at naming things.
    // This populates the `appStorage` with calculations from
    // the server.
    .factory('remoteScoreCalculator', function (appStorage, scoreResource) {
      var onResponse = function (response) {
        console.log('Response: ', response);

      };

      return {
        update: function () {
          scoreResource.get({results: appStorage.getResults()}, onResponse);
        }
      };
    });
}());
