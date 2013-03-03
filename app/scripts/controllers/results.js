(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('ResultsCtrl', function ($scope, appStorage) {
      $scope.results = appStorage.getResults();

      $scope.addRow = function () {
        $scope.results.push({
          teamHome: 'Team A',
          teamAway: 'Team B',
          goalsHome: 0,
          goalsAway: 0
        });
      };

      $scope.gridOptions = {
        data: 'results',
        columnDefs: [{
          displayName: 'Home Team',
          field: 'teamHome',
          editOptions: {
            type: 'select',
            options: appStorage.getTeams()
          }
        }, {
          displayName: 'Away Team',
          field: 'teamAway',
          editOptions: {
            type: 'select',
            options: appStorage.getTeams()
          }
        }, {
          displayName: 'Home Score',
          field: 'goalsHome'
        }, {
          displayName: 'Away Score',
          field: 'goalsAway'
        }]
      };

    });

}());
