angular.module('dilbert.home').directive('timeLine', [
  '$rootScope', '$parse', function($rootScope, $parse) {
    return {
      restrict: 'E',
      templateUrl: "views/directive_templates/timeline.html",
      scope: {
        slotData: '='
      },
      link: function(scope, elem, attrs) {
        var i, pixelPerSecond, pps, ppsTotal, shortestSlot, time, timeData, timeLineWidth, _i, _len;
        timeData = scope.slotData;
        console.log(timeData);
        scope.timeData = _.sortBy(timeData, 'time');
        timeLineWidth = $(elem).find('.timeline-interval-region').width();
        shortestSlot = 100000;
        for (i = _i = 0, _len = timeData.length; _i < _len; i = ++_i) {
          time = timeData[i];
          if (i === 0) {
            continue;
          }
          if (shortestSlot > time - timeData[i - 1].time) {
            shortestSlot = time - timeData[i - 1].time;
          }
        }
        pps = 40 / shortestSlot;
        ppsTotal = timeLineWidth / (timeData[timeData.length - 1].time - timeData[0].time);
        pixelPerSecond = pps > ppsTotal ? pps : ppsTotal;
        scope.getUnixTime = function(time) {
          return moment.unix(time).format('H:mm');
        };
        scope.getSlotPercentage = function(time, index) {
          var percentage, slotTime;
          slotTime = time - timeData[index - 1].time;
          percentage = Math.floor(slotTime * pixelPerSecond);
          return "" + percentage + "px";
        };
        return scope.getSlotDifference = function(index) {
          var diff, duration, slotEnd, slotStart;
          console.log('getSlotDifference');
          slotStart = timeData[index - 1].time;
          slotEnd = timeData[index].time;
          duration = moment.unix(slotEnd).diff(slotStart * 1000);
          diff = '';
          if (moment.duration(duration).hours()) {
            diff += "" + (moment.duration(duration).hours()) + " hr";
          }
          if (moment.duration(duration).hours() && moment.duration(duration).minutes()) {
            diff += ', ';
          }
          if (moment.duration(duration).minutes()) {
            diff += "" + (moment.duration(duration).minutes()) + " min";
          }
          return diff;
        };
      }
    };
  }
]);
