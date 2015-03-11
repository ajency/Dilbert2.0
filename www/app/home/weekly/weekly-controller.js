angular.module('dilbert.home').controller('WeeklyController', [
  '$scope', '$ionicModal', '$ionicPopup', '$ionicLoading', 'WeekConfig', 'dateSummary', function($scope, $ionicModal, $ionicPopup, $ionicLoading, WeekConfig, dateSummary) {
    var calSummary;
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.displayPeriod;
    $scope.summary = [];
    $scope.weeklyConfig = [];
    $scope.dateSummary = [];
    $scope.weekStart = moment().startOf('isoWeek').format('DD-MM-YYYY');
    $scope.displayCalender = false;
    dateSummary.getDataSummary().then(function(summaryData) {
      return $scope.dateSummary = summaryData;
    });
    $scope.setup = function(time) {
      if (_.isUndefined(time)) {
        time = moment().startOf('isoWeek').format('DD-MM-YYYY');
      }
      WeekConfig.getConfig().then(function(configData) {
        return $scope.weeklyConfig = configData;
      });
      return dateSummary.getDataSummary().then(function(summaryData) {
        $scope.dateSummary = summaryData;
        calSummary();
        $scope.displayPeriod = moment(time, 'DD-MM-YYYY').format('Do MMM YY') + " to " + moment(time, 'DD-MM-YYYY').add($scope.weeklyConfig.expected_time_org, 'd').format('Do MMM YY');
        return $ionicLoading.hide();
      });
    };
    calSummary = function() {
      var i, _i, _ref;
      $scope.expectedHrs = $scope.weeklyConfig.expected_time_user * $scope.weeklyConfig.expected_time_org;
      console.log($scope.expectedHrs);
      $scope.totalHrs = null;
      for (i = _i = 0, _ref = $scope.dateSummary.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        $scope.totalHrs += $scope.dateSummary[i].duration;
      }
      console.log($scope.totalHrs);
      $scope.endSummary = '';
      if ($scope.expectedHrs > $scope.totalHrs) {
        $scope.endSummary = 'Weekly hours not met';
      } else {
        $scope.endSummary = 'Extra Hours: ' + ($scope.totalHrs - $scope.expectedHrs) + ' hrs';
      }
      return console.log($scope.endSummary);
    };
    $scope.calender = {
      display: false
    };
    $ionicModal.fromTemplateUrl('views/modal-templates/weekly-calendar-template.html', {
      backdrop: true,
      scope: $scope
    }).then(function(modal) {
      $scope.calModal = modal;
      return $scope.calender.modal = modal;
    });
    $scope.openModal = function(modal_name) {
      if (modal_name === 'calendar') {
        $scope.calender.display = true;
        return $scope.calender.modal.show();
      }
    };
    return $scope.closeModal = function(modal_name) {
      if (modal_name === 'calendar') {
        $scope.calender.display = false;
        return $scope.calender.modal.hide();
      }
    };
  }
]);
