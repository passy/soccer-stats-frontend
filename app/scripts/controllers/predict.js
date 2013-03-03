(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('PredictCtrl', function ($scope, appStorage) {
      $scope.scores = appStorage.getScores();
    });
}());
