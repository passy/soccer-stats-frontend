(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('StrengthCtrl', function ($scope, remoteScoreCalculator, appStorage) {
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
