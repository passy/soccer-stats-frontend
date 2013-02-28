(function () {
  'use strict';

  angular.module('soccerApp', [])
    .config(function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    });
}());
