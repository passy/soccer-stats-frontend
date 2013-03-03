(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('StrengthCtrl', function ($scope, remoteScoreCalculator, appStorage) {
      $scope.data = {
        scores: appStorage.getScores(),
        results: appStorage.getResults()
      };


      $scope.$watch('data.results', function () {
        $scope.data.results.forEach(function (item) {
          item.goals = [item.goalsHome, item.goalsAway].join(':');
        });
      });

      $scope.$watch('data.scores', function () {
        $scope.loaded = Object.keys($scope.data.scores).length > 0;
      });

      $scope.gridOptions = {
        data: 'data.results',
        editable: false,
        columnDefs: [{
          displayName: 'Home Team',
          field: 'teamHome'
        }, {
          displayName: 'Away Team',
          field: 'teamAway'
        }, {
          displayName: 'Goals',
          field: 'goals'
        }, {
          displayName: 'Error',
          field: 'error'
        }]
      };

      $scope.calculate = function () {
        $scope.loading = true;

        remoteScoreCalculator.update().then(function () {
          $scope.loading = false;

          $scope.data = {
            scores: appStorage.getScores(),
            results: appStorage.getResults()
          };

        }, function () {
          $scope.loading = false;
        });
      };
    });
}());
