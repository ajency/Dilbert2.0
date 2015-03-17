angular.module("dilbert", ["ionic", "ngCordova", "dilbert.network", "dilbert.common", "dilbert.login", "dilbert.home"]).run([
  '$ionicPlatform', '$rootScope', '$ionicPopup', function($ionicPlatform, $rootScope, $ionicPopup) {
    $rootScope.slotData = [];
    return $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  }
]).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'views/main.html'
  });
  return $urlRouterProvider.otherwise("/login");
});
