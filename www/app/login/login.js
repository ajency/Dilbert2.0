angular.module('dilbert.login', []).controller('LoginController', [
  '$scope', '$state', '$window', function($scope, $state, $window) {
    return $scope.login = function() {
      return $state.go('home');
    };
  }
]).config([
  '$stateProvider', function($stateProvider) {
    return $stateProvider.state("login", {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginController"
    });
  }
]);
