'use strict';

angular.module('soccerApp')
  .directive('passyMenu', function ($location) {
    return {
      template: '<li>' +
        '<a href="#{{href}}" ng-transclude></a>' +
        '</li>',
      restrict: 'E',
      scope: {
        'href': '@href'
      },
      replace: true,
      transclude: true,
      link: function postLink(scope, element) {
        scope.$on('$routeChangeSuccess', function () {
          var path = $location.path();

          if (scope.href === path) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });
      }
    };
  });
