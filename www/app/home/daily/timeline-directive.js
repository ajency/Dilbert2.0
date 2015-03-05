angular.module('dilbert.home').directive('timeLine', [
  '$rootScope', '$parse', '$compile', 'ModalData', '$ionicPopup', function($rootScope, $parse, $compile, ModalData, $ionicPopup) {
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
          if (index === 0) {
            return;
          }
          if (timeData[index].status === 'offline') {
            task = 'Break';
          } else {
            task = timeData[index].task;
          }
          return task;
        };
        scope.getSlotDifference = function(index) {
          var diff, duration, slotEnd, slotStart;
          if (index === 0) {
            return;
          }
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
        scope.getColor = function(index) {
          var color, status;
          if (index === 0) {
            return;
          }
          status = timeData[index].status;
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
          scope.searchtext = 'all';
          if ($(e.target).parent().parent().parent().closest('.time-description').hasClass('combine-parent')) {
            return;
          }
          if (!$(e.target).parent().parent().parent().hasClass('slot')) {
            return;
          }
          status = $rootScope.slotData[id + 1].status;
          slotStart = $rootScope.slotData[id].time;
          slotEnd = $rootScope.slotData[id + 1].time;
          displayStart = moment.unix(slotStart).format('h:mm a');
          displayEnd = moment.unix(slotEnd).format('h:mm a');
          slotDuration = moment.unix(slotEnd).diff(moment.unix(slotStart), 'minutes');
          ModalData.setData(status, slotStart, slotEnd, displayStart, displayEnd, slotDuration);
          return scope.openModal('split');
        };
        scope.editSlot = function(e, id) {
          var displayEnd, displayStart, slotDuration, slotEnd, slotStart, status, task;
          if ($(e.target).parent().parent().parent().closest('.time-description').hasClass('combine-parent')) {
            return;
          }
          if (!$(e.target).parent().parent().parent().hasClass('slot')) {
            return;
          }
          status = $rootScope.slotData[id + 1].status;
          task = $rootScope.slotData[id + 1].task;
          slotStart = $rootScope.slotData[id].time;
          slotEnd = $rootScope.slotData[id + 1].time;
          displayStart = moment.unix(slotStart).format('h:mm a');
          displayEnd = moment.unix(slotEnd).format('h:mm a');
          slotDuration = moment.unix(slotEnd).diff(moment.unix(slotStart), 'minutes');
          ModalData.setData(status, slotStart, slotEnd, displayStart, displayEnd, slotDuration, task);
          return scope.openModal('edit');
        };
        scope.mergeFlag = false;
        scope.merge = function(e, id) {
          var isFirst, isLast;
          scope.id = id;
          scope.searchtext = 'all';
          scope.mergeFlag = true;
          if ($(e.target).parent().parent().parent().closest('.time-description').hasClass('combine-parent')) {
            return;
          }
          if (!$(e.target).parent().parent().parent().hasClass('slot')) {
            return;
          }
          isFirst = id === 0 ? true : false;
          isLast = id === $rootScope.slotData.length - 2 ? true : false;
          if (isFirst && isLast) {
            return;
          }
          $(e.target).parent().parent().parent().closest('.time-description').addClass('combine-parent');
          $(e.target).parent().parent().parent().addClass('combine-current');
          $(e.target).parent().parent().parent().closest('.taskInfo').append('<span class="cancel-combine" style="float:right;padding-top: 65px;"><i class="icon ion-close-round" style="color:white"></i></span>');
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
          scope.text = {
            data: ''
          };
          slotNo = scope.id;
          neighbourSlot = $(e.target).attr('data-slot');
          neighbourSlot = Number(neighbourSlot);
          scope.clickedSlot = {
            task: $rootScope.slotData[slotNo + 1].task,
            duration: moment.unix($rootScope.slotData[slotNo + 1].time).diff(moment.unix($rootScope.slotData[slotNo].time), 'minutes'),
            status: $rootScope.slotData[slotNo + 1].status
          };
          scope.nSlot = {
            task: $rootScope.slotData[neighbourSlot + 1].task,
            duration: moment.unix($rootScope.slotData[neighbourSlot + 1].time).diff(moment.unix($rootScope.slotData[neighbourSlot].time), 'minutes'),
            status: $rootScope.slotData[neighbourSlot + 1].status
          };
          $ionicPopup.show({
            title: 'Merge Summary',
            template: '<div>' + "<h4>Clicked Slot</h4>" + ("<p class='item item-input'>Task: " + scope.clickedSlot.task + "</p>") + ("<p class='item item-input'>Duration: " + scope.clickedSlot.duration + " minutes</p>") + "<h4>Slot to be merged with</h4>" + ("<p class='item item-input'>Task: " + scope.nSlot.task + "</p>") + ("<p class='item item-input'>Duration: " + scope.nSlot.duration + " minutes</p><br>") + "<label class='item item-input item-select'><div class='input-label'>Task for Merged slot</div>" + ("<select ng-model='text.data' selected><option>" + scope.clickedSlot.task + "</option><option>" + scope.nSlot.task + "</option></select></label>") + "</div>",
            scope: scope,
            buttons: [
              {
                text: 'Cancel',
                onTap: function(e) {
                  return stopCombineSlot(e);
                }
              }, {
                text: 'Confirm',
                type: 'button-positive',
                onTap: function(e) {
                  var status;
                  if (scope.text.data === '') {
                    scope.text.data = scope.clickedSlot.task;
                  }
                  status = '';
                  if (scope.clickedSlot.status === 'offline' || scope.nSlot.status === 'offline') {
                    status = 'offline';
                  } else if (scope.clickedSlot.status === 'idle' && scope.nSlot.status === 'idle') {
                    status = 'idle';
                  } else if ((scope.clickedSlot.status === 'idle' && scope.nSlot.status === 'available') || (scope.clickedSlot.status === 'available' && scope.nSlot.status === 'idle')) {
                    status = 'idle';
                  } else if (scope.clickedSlot.status === 'available' && scope.nSlot.status === 'available') {
                    status = 'available';
                  }
                  if (neighbourSlot < slotNo) {
                    $rootScope.slotData.splice(slotNo, 1);
                    $rootScope.slotData[slotNo].task = scope.text.data;
                    $rootScope.slotData[slotNo].status = status;
                  } else if (neighbourSlot > slotNo) {
                    $rootScope.slotData.splice(slotNo + 1, 1);
                    $rootScope.slotData[slotNo + 1].task = scope.text.data;
                    $rootScope.slotData[slotNo + 1].status = status;
                  }
                  return console.log('merge executed');
                }
              }
            ]
          }).then(function(res) {
            return console.log('Merge closed');
          });
          return stopCombineSlot(e);
        };
        return stopCombineSlot = function(e) {
          $('.time-description.combine-parent .slot.combine-current .cancel-combine').off().remove();
          $('.time-description.combine-parent .slot.combine-neighbour').off('tap').removeClass('combine-neighbour');
          $('.time-description.combine-parent .slot.combine-current').removeClass('combine-current');
          $('.time-description.combine-parent ').removeClass('combine-parent');
          return scope.mergeFlag = false;
        };
      }
    };
  }
]);
