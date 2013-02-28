(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('ResultsCtrl', function ($scope) {
      $scope.results = [{
        teamHome: 'BVB',
        teamAway: 'HSV',
        goalsHome: 3,
        goalsAway: 5
      }];

      // Very expensive and unnecessary. Should be lazily generated.
      $scope.$watch('results', function (value) {
        value.map(function (item) {
          item.goalsFormatted = String(item.goalsHome) + ':' + item.goalsAway;
        });
      }, true);

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
          field: 'teamHome'
        }, {
          displayName: 'Away Team',
          field: 'teamAway'
        }, {
          displayName: 'Score',
          field: 'goalsFormatted'
        }]
      };

    });

}());
