(function () {
  'use strict';

  angular.module('soccerApp')
    .directive('soccerReset', function (appStorage) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          element.click(function () {
            // Not preventing the default here, because it causes
            // a navigation to the start page which is quite handy.

            if (window.confirm('Really delete all your app data?')) {
              appStorage.clear();
            }
          });
        }
      };
    });

}());
