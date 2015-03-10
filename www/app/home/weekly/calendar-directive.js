angular.module('dilbert.home').directive('customCalendar', [
  '$rootScope', '$parse', '$compile', '$ionicPopup', function($rootScope, $parse, $compile, $ionicPopup) {
    return {
      restrict: 'E',
      template: '<div><div class="myCalendar" id="myCalendar"></div><div>{{dateInfo}}</div></div>',
      replace: true,
      link: function(scope, elem, attrs) {
        return $("#myCalendar").ionCalendar({
          lang: "en",
          years: "100",
          format: "DD.MM.YYYY,ddd",
          sundayFirst: false,
          onClick: function(date) {
            if (date.indexOf('Mon') >= 0) {
              return console.log(date + ' is a monday');
            }
          }
        });
      }
    };
  }
]);
