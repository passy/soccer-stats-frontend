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
            return {
              field: x.field,
              editOptions: x.editOptions
            };
          });

          scope.$watch(options.data, function (data) {
            scope.data = data;
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

        scope.$watch('content', function (value) {
          console.log("Content changed!", value);
        }, true);
      }
    };
  });
}());
