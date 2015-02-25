angular.module('dilbert.home', []).controller('HomeController', ['$scope', function($scope) {}]).config([
  '$stateProvider', function($stateProvider) {
    return $stateProvider.state('home', {
      url: '/home',
      parent: 'main',
      views: {
        "mainContent": {
          controller: 'HomeController',
          templateUrl: 'views/home.html'
        }
      }
    }).state("daily", {
      url: "/daily",
      parent: 'home',
      views: {
        "dailyContent": {
          templateUrl: "views/daily.html",
          controller: "DailyController"
        }
      }
    }).state("weekly", {
      url: "/weekly",
      parent: 'home',
      views: {
        "weeklyContent": {
          templateUrl: "views/weekly.html"
        }
      }
    });
  }
]);
