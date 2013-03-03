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
          }]
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
        }
      };
    });
}());
