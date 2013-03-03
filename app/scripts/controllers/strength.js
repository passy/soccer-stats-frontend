(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('StrengthCtrl', function ($scope) {
      $scope.calculate = function () {
        $scope.loading = true;
      };
    });
}());
