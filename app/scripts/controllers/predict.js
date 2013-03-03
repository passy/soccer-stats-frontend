(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('PredictCtrl', function ($scope, appStorage) {
      $scope.scores = appStorage.getScores();

      $scope.$watch('scores', function () {
        $scope.loaded = Object.keys($scope.scores).length;
      });

      var teamChanged = function () {
        var scoreA = $scope.scores[$scope.teamA],
          scoreB = $scope.scores[$scope.teamB];

        if (scoreA && scoreB) {
          $scope.result = scoreA - scoreB;
          $scope.winner = $scope.result >= 0 ? $scope.teamA : $scope.teamB;
          $scope.resultDiff = Math.round(Math.abs($scope.result));
        } else {
          $scope.result = null;
        }
      };

      $scope.$watch('teamA', teamChanged);
      $scope.$watch('teamB', teamChanged);
    });
}());
