angular.module('dilbert.home').controller('DailyController', [
  '$rootScope', '$scope', '$ionicModal', '$ionicPopup', 'DailyAPI', 'DailyTasks', 'ModalData', '$ionicLoading', function($rootScope, $scope, $ionicModal, $ionicPopup, DailyAPI, DailyTasks, ModalData, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.dataAvailable = false;
    $rootScope.slotData = [];
    $scope.tasks = [];
    $scope.mData = [];
    $scope.searchtext = 'all';
    DailyAPI.getDailyData().then(function(dailyData) {
      $rootScope.slotData = dailyData;
      $scope.duration = $rootScope.slotData[0].duration;
      return $scope.dataAvailable = true;
    });
    DailyTasks.getDailyTasks().then(function(dailyTask) {
      $scope.tasks = dailyTask;
      $scope.tasks = _.sortBy($scope.tasks, 'taskId');
      return $ionicLoading.hide();
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
    $ionicModal.fromTemplateUrl('views/modal-templates/edit-template.html', {
      backdrop: true,
      scope: $scope
    }).then(function(modal) {
      return $scope.editModal = modal;
    });
    $scope.openModal = function(modal_name) {
      if (modal_name === 'calendar') {
        return $scope.calModal.show();
      } else if (modal_name === 'split') {
        $scope.mData = [];
        $scope.mData = ModalData.getData();
        return $scope.splitModal.show();
      } else if (modal_name === 'edit') {
        $scope.mData = [];
        $scope.mData = ModalData.getData();
        return $scope.editModal.show();
      }
    };
    return $scope.closeModal = function(modal_name) {
      if (modal_name === 'calendar') {
        return $scope.calModal.hide();
      } else if (modal_name === 'split') {
        return $scope.splitModal.hide();
      } else if (modal_name === 'edit') {
        return $scope.editModal.hide();
      }
    };
  }
]).controller('SplitController', [
  '$rootScope', '$scope', 'ModalData', function($rootScope, $scope, ModalData) {
    return $scope.splitSlot = function(timeMinutes, slotPos, newTask) {
      var newMoment, newMomentUnix, slotMinutes;
      timeMinutes = Number(timeMinutes);
      slotMinutes = timeMinutes > 0 && timeMinutes < $scope.mData.slotDuration ? timeMinutes : '';
      if (slotMinutes === '') {
        return;
      }
      newMoment = moment.unix($scope.mData.slotStart);
      if (slotPos === 'end') {
        newMoment.add($scope.mData.slotDuration - slotMinutes, 'm');
      } else {
        newMoment.add(slotMinutes, 'm');
      }
      console.log(newMomentUnix = newMoment.unix());
      if (newMomentUnix > $scope.mData.slotStart && newMomentUnix < $scope.mData.slotEnd) {
        $rootScope.slotData.push({
          time: newMomentUnix,
          task: newTask,
          status: $scope.mData.status
        });
        $scope.closeModal('split');
      }
      return $rootScope.slotData = _.sortBy($rootScope.slotData, 'time');
    };
  }
]);
