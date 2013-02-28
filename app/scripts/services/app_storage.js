(function () {
  'use strict';

  angular.module('soccerApp')
    .factory('appStorage', function () {
      var store = {
        teams: ['BVB', 'Bayern München', 'HSV']
      };

      return {
        getTeams: function () {
          return store.teams || [];
        },

        setTeams: function (teams) {
          store.teams = teams;
        }
      };
    });
}());
