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
          scope.editable = !!options.editable;

          scope.headers = options.columnDefs.map(function (x) {
            return x.displayName;
          });

          scope.columns = options.columnDefs.map(function (x) {
            return {
              field: x.field,
              editOptions: x.editOptions
            };
          });

          scope.$watch(options.data, function (data) {
            if (data !== undefined) {
              scope.data = data;
            }
          });
        }
      };
    })

  // Select an element (mostly inputs) if the expression evaluates to true.
  .directive('passySelect', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch(attrs.passySelect, function (val) {
          if (val) {
            element.select();
          }
        });
      }
    };
  })

  .directive('passyEditable', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/_passy_editable.html',
      replace: true,
      scope: {
        'content': '=content',
        'options': '=options'
      },
      link: function (scope) {
        scope.editMode = false;
      }
    };
  });
}());
