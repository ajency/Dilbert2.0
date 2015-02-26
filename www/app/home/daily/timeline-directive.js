angular.module('daily.timeline.directive', []).directive('timeLine', [
  '$rootScope', '$parse', '$compile', function($rootScope, $parse, $compile) {
    return {
      restrict: 'E',
      templateUrl: "views/directive-templates/timeline.html",
      link: function(scope, elem, attrs) {
        var getEndTime, getStartTime, i, pixelPerSecond, pps, ppsTotal, shortestSlot, time, timeData, timeLineIntervalRegionWidth, _i, _len;
        timeData = scope.$eval(attrs.slotData);
        timeData = _.sortBy(timeData, 'time');
        scope.$watch('slotData', function(newValue) {
          console.log(newValue);
          scope.timeData = _.sortBy(newValue, 'time');
          return console.log(scope.timeData);
        }, true);
        timeLineIntervalRegionWidth = $(elem).find('.timeline-interval-region').width();
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
        ppsTotal = timeLineIntervalRegionWidth / (timeData[timeData.length - 1].time - timeData[0].time);
        pixelPerSecond = pps > ppsTotal ? pps : ppsTotal;
        getStartTime = function() {
          return _.first(timeData).starttime;
        };
        getEndTime = function() {
          return _.last(timeData).endtime;
        };
        scope.getUnixTime = function(time) {
          return moment.unix(time).format('H:mm');
        };
        scope.getSlotPercentage = function(time, index) {
          var percentage, slotTime;
          slotTime = time - timeData[index - 1].time;
          percentage = Math.floor(slotTime * pixelPerSecond);
          return "" + percentage + "px";
        };
        scope.getTask = function(index) {
          task;
          var task;
          if (timeData[index].status === 'offline') {
            task = 'Break';
          } else {
            task = timeData[index].task;
          }
          return task;
        };
        scope.getSlotDifference = function(index) {
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
        return scope.getColor = function(status) {
          color;
          var color;
          if (status === 'available') {
            color = '#468966';
          } else if (status === 'idle') {
            color = '#FFB03B';
          } else {
            color = '#4B4E50';
          }
          return color;
        };
      }
    };
  }
]);
