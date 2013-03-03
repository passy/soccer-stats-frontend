(function () {
  'use strict';

  angular.module('soccerApp', ['ngResource'])
    .config(function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/teams', {
        templateUrl: 'views/teams.html',
        controller: 'TeamsCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/strength', {
        templateUrl: 'views/strength.html',
        controller: 'StrengthCtrl'
      })
      .when('/predict', {
        templateUrl: 'views/predict.html',
        controller: 'PredictCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    });
}());
