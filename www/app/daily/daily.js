angular.module('dilbert.home').controller('DailyController', [
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
]);
