(function () {
  'use strict';

  angular.module('soccerApp')
    .controller('TeamsCtrl', function ($scope, appStorage) {
      $scope.teams = appStorage.getTeams();

      $scope.$watch('teams', function (teams) {
        appStorage.setTeams(teams);
      });

      $scope.deleteTeam = function (team) {
        $scope.teams = $scope.teams.filter(function (v) { return v !== team; });
      };

      $scope.addTeam = function (team) {
        var newTeams = $scope.teams.slice(0);
        newTeams.push(team);
        $scope.teams = newTeams;
      };

    });
}());
