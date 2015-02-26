angular.module("dilbert", ["ionic", "dilbert.login", "dilbert.home", "daily.service"]).run([
  '$ionicPlatform', '$rootScope', '$ionicPopup', function($ionicPlatform, $rootScope, $ionicPopup) {
    return $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      if (window.connection) {
        if (navigator.connection.type === Connection.NONE) {
          return $ionicPopup.confirm({
            title: "Internet Disconnected",
            content: "Please connect to the internet and try again"
          }).then(function(result) {
            if (!result) {
              return ionic.Platform.exitApp;
            }
          });
        } else {
          return console.log("Internet Connected");
        }
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
