angular.module('dilbert.home').directive('customCalendar', [
  '$rootScope', '$parse', '$compile', '$ionicPopup', '$timeout', function($rootScope, $parse, $compile, $ionicPopup, $timeout) {
    return {
      restrict: 'E',
      template: '<div><div class="myCalendar" id="myCalendar"></div></div>',
      replace: true,
      scope: {
        display: '='
      },
      link: function(scope, elem, attrs) {
        return scope.$watch('display', function(value) {
          if (value) {
            return $timeout(function() {
              return $("#myCalendar").ionCalendar({
                lang: "en",
                years: "100",
                format: "DD.MM.YYYY,ddd",
                sundayFirst: false,
                onClick: function(date) {
                  if (date.indexOf('Mon') >= 0) {
                    console.log(date + ' is a monday');
                    value = moment(date, 'DD.MM.YYYY,ddd').format('DD-MM-YYYY');
                    return scope.setup(value);
                  }
                }
              });
            });
          }
        });
      }
    };
  }
]);
