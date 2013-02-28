(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('TeamsCtrl', function ($scope, appStorage) {
      $scope.teams = appStorage.getTeams();

      $scope.$watch('teams', function (teams) {
        appStorage.setTeams(teams);
      }, true);

      $scope.deleteTeam = function (team) {
        $scope.teams = $scope.teams.filter(function (v) { return v !== team; });
      };

      $scope.addTeam = function (team) {
        $scope.teams.push(team);
      };

    });
}());
