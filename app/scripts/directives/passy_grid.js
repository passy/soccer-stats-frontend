(function () {
  'use strict';

  angular.module('soccerApp')
    .directive('passyGrid', function () {
      return {
        restrict: 'A',
        templateUrl: 'views/_passy_grid.html',
        scope: true,
        link: function postLink(scope, element, attrs) {
          var options = scope.$eval(attrs.passyGrid);

          scope.headers = options.columnDefs.map(function (x) {
            return x.displayName;
          });

          scope.columns = options.columnDefs.map(function (x) {
            return x.field;
          });

          scope.dataClick = function (element) {
            console.log("Clicked", element);
          };

          scope.$watch(options.data, function (data) {
            scope.data = data;
          });
        }
      };
    })

  .directive('passyEditable', function () {
    return {
      restrict: 'A',
      templateUrl: 'views/_passy_editable.html',
      replace: true,
      scope: {
        'content': '=passyEditable'
      },
      link: function (scope) {
        scope.editMode = false;
      }
    };
  });
}());
