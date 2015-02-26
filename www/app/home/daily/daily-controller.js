angular.module('dilbert.home').controller('DailyController', [
  '$rootScope', '$scope', '$ionicModal', '$ionicPopup', 'DailyAPI', function($rootScope, $scope, $ionicModal, $ionicPopup, DailyAPI) {
    $scope.available = false;
    DailyAPI.getDailyData().then(function(dailyData) {
      $scope.available = true;
      $rootScope.slotData = dailyData;
      return $scope.duration = $rootScope.slotData[0].duration;
    });
    $scope.getCurrentDate = function() {
      return moment().format("ddd MMM Do YYYY");
    };
    $ionicModal.fromTemplateUrl('views/modal-templates/calender-template.html', {
      scope: $scope
    }).then(function(modal) {
      return $scope.calModal = modal;
    });
    $ionicModal.fromTemplateUrl('views/modal-templates/split-template.html', {
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
