angular.module('dilbert.home').directive('timeLine', [
  '$rootScope', '$parse', '$compile', 'ModalData', function($rootScope, $parse, $compile, ModalData) {
    return {
      restrict: 'E',
      templateUrl: "views/directive-templates/timeline.html",
      replace: true,
      link: function(scope, elem, attrs) {
        var combineSlots, i, pixelPerSecond, pps, ppsTotal, shortestSlot, stopCombineSlot, time, timeData, timeLineWidth, _i, _len;
        timeData = $rootScope.slotData;
        timeData = _.sortBy(timeData, 'time');
        scope.$watch('slotData', function(newValue) {
          timeData = newValue;
          return scope.timeData = timeData;
        }, true);
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
        scope.getTask = function(index) {
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
        scope.getColor = function(status) {
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
        scope.split = function(e, id, status) {
          var displayEnd, displayStart, slotDuration, slotEnd, slotStart;
          if ($(e.target).closest('.time-description').hasClass('combine-parent')) {
            return;
          }
          if (!$(e.target).hasClass('slot')) {
            return;
          }
          slotStart = $rootScope.slotData[id].time;
          slotEnd = $rootScope.slotData[id + 1].time;
          displayStart = moment.unix(slotStart).format('h:mm a');
          displayEnd = moment.unix(slotEnd).format('h:mm a');
          slotDuration = moment.unix(slotEnd).diff(moment.unix(slotStart), 'minutes');
          ModalData.setData(status, slotStart, slotEnd, displayStart, displayEnd, slotDuration);
          return scope.openModal('split');
        };
        scope.merge = function(e, id) {
          var isFirst, isLast;
          scope.id = id;
          if ($(e.target).closest('.time-description').hasClass('combine-parent')) {
            return;
          }
          if (!$(e.target).hasClass('slot')) {
            return;
          }
          isFirst = id === 0 ? true : false;
          isLast = id === $rootScope.slotData.length - 2 ? true : false;
          if (isFirst && isLast) {
            return;
          }
          console.log(isFirst + ' ' + isLast);
          $(e.target).closest('.time-description').addClass('combine-parent');
          $(e.target).addClass('combine-current');
          $(e.target).append('<span class="cancel-combine" style="float:right"><i class="icon ion-close"></i></span>');
          if (!isFirst) {
            $('.time-description.combine-parent .slot[data-slot="' + (id - 1) + '"]').addClass('combine-neighbour');
          }
          if (!isLast) {
            $('.time-description.combine-parent .slot[data-slot="' + (id + 1) + '"]').addClass('combine-neighbour');
          }
          $('.time-description.combine-parent .slot.combine-neighbour').on('tap', combineSlots.bind(id, e));
          $('.time-description.combine-parent .slot.combine-current .cancel-combine').on('tap', stopCombineSlot.bind(e));
          return false;
        };
        combineSlots = function(slotNo, e) {
          var neighbourSlot;
          slotNo = scope.id;
          neighbourSlot = $(e.target).attr('data-slot');
          neighbourSlot = Number(neighbourSlot);
          if (neighbourSlot < slotNo) {
            $rootScope.slotData.splice(slotNo, 1);
          } else if (neighbourSlot > slotNo) {
            $rootScope.slotData.splice(slotNo + 1, 1);
          }
          scope.$apply();
          return stopCombineSlot(e);
        };
        return stopCombineSlot = function(e) {
          $('.time-description.combine-parent .slot.combine-current .cancel-combine').off().remove();
          $('.time-description.combine-parent .slot.combine-neighbour').off('tap').removeClass('combine-neighbour');
          $('.time-description.combine-parent .slot.combine-current').removeClass('combine-current');
          return $('.time-description.combine-parent ').removeClass('combine-parent');
        };
      }
    };
  }
]);
