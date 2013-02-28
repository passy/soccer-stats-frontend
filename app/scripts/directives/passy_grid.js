(function () {
  'use strict';

  angular.module('soccerApp')
    .directive('passyGrid', function () {
      return {
        restrict: 'A',
        templateUrl: 'views/_passy_grid.html',
        link: function postLink(scope, element, attrs) {
        }
      };
    });
}());
