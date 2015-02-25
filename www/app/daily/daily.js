angular.module('daily.controller', []).controller('DailyController', [
  '$rootScope', '$scope', '$ionicModal', '$ionicPopup', function($rootScope, $scope, $ionicModal, $ionicPopup) {
    var colors, end, i, len, start, tasks, times, _i, _ref;
    times = [1422523800, 1422526800, 1422528000, 1422534600, 1422538200, 1422541800, 1422546400, 1422552600];
    colors = ['#468966', '#FFF0A5', '#FFB03B', '#B64926', '#8E2800', '#02CCC8', '#FFAB1C', '#99CF2D', '#1C3D59', '#5C832F', '#363942'];
    tasks = ['Dilbert Mobile - Object Defination', 'Dilbert Mobile - Object Defination', 'Dilbert Mobile - WireFrame Design', 'Dilbert Mobile - WireFrame Design', 'Dilbert Mobile - Static Layout', 'Dilbert Mobile - Static Layout', 'Dilbert Mobile - Bug Fixes', 'Dilbert Mobile - Bug Fixes'];
    $rootScope.slotData = [];
    len = times.length - 1;
    end = moment.duration(moment.unix(times[len]));
    start = moment.duration(moment.unix(times[0]));
    $scope.duration = moment.duration(end.subtract(start)).asHours();
    for (i = _i = 0, _ref = times.length - 1; _i <= _ref; i = _i += 1) {
      $rootScope.slotData.push({
        time: times[i],
        color: colors[i],
        task: tasks[i]
      });
    }
    $scope.getCurrentDate = function() {
      return moment().format("ddd MMM Do YYYY");
    };
    $ionicModal.fromTemplateUrl('views/modal_templates/calender_template.html', {
      scope: $scope
    }).then(function(modal) {
      return $scope.calModal = modal;
    });
    $ionicModal.fromTemplateUrl('views/modal_templates/split_template.html', {
      backdrop: true,
      scope: $scope
    }).then(function(modal) {
      return $scope.splitModal = modal;
    });
    $scope.openModal = function(modal_name) {
      if (modal_name === 'calendar') {
        return $scope.calModal.show();
      } else if (modal_name === 'split') {
        return $scope.splitModal.show();
      }
    };
    $scope.closeModal = function(modal_name) {
      if (modal_name === 'calendar') {
        return $scope.calModal.hide();
      } else if (modal_name === 'split') {
        return $scope.splitModal.hide();
      }
    };
    $scope.merge = function(e, id) {
      return $ionicPopup.alert({
        title: 'Merge',
        template: "Merge " + id
      }).then(function(res) {
        console.log("merge " + id);
        return console.log(e);
      });
    };
    $scope.split = function(e, id) {
      var slotNo;
      if ($(e.target).closest('.time-description').hasClass('combine-parent')) {
        return;
      }
      if (!$(e.target).hasClass('slot')) {
        return;
      }
      slotNo = parseInt($(e.target).attr('data-slot'));
      $scope.slotStart = $scope.slotData[slotNo].time;
      $scope.slotEnd = $scope.slotData[slotNo + 1].time;
      $scope.displayStart = moment.unix($scope.slotStart).format('h:mm a');
      $scope.displayEnd = moment.unix($scope.slotEnd).format('h:mm a');
      $scope.slotDuration = moment.unix($scope.slotEnd).diff(moment.unix($scope.slotStart), 'minutes');
      return $scope.openModal('split');
    };
    return $scope.splitSlot = function(timeMinutes, slotPos, newTask) {
      var newMoment, newMomentUnix, slotMinutes;
      console.log('split');
      console.log(timeMinutes + " " + slotPos + " " + newTask);
      timeMinutes = Number(timeMinutes);
      slotMinutes = timeMinutes > 0 && timeMinutes < $scope.slotDuration ? timeMinutes : '';
      if (slotMinutes === '') {
        return;
      }
      newMoment = moment.unix($scope.slotStart);
      if (slotPos === 'end') {
        newMoment.add($scope.slotDuration - slotMinutes, 'm');
      } else {
        newMoment.add(slotMinutes, 'm');
      }
      newMomentUnix = newMoment.unix();
      if (newMomentUnix > $scope.slotStart && newMomentUnix < $scope.slotEnd) {
        return $rootScope.slotData.push({
          time: newMomentUnix,
          task: newTask,
          color: '#000000'
        });
      }
    };
  }
]).directive('timeLine', [
  '$rootScope', '$parse', '$compile', function($rootScope, $parse, $compile) {
    return {
      restrict: 'E',
      templateUrl: "views/directive_templates/timeline.html",
      link: function(scope, elem, attrs) {
        var getEndTime, getStartTime, i, pixelPerSecond, pps, ppsTotal, shortestSlot, time, timeData, timeLineIntervalRegionWidth, _i, _len;
        timeData = scope.$eval(attrs.slotData);
        timeData = _.sortBy(timeData, 'time');
        scope.$watch('slotData', function(newValue) {
          console.log('From Watch');
          console.log(newValue);
          return scope.timeData = _.sortBy(newValue, 'time');
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
          return _.first(timeData).time;
        };
        getEndTime = function() {
          return _.last(timeData).time;
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
