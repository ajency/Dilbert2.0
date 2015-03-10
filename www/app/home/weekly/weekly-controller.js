angular.module('dilbert.home').controller('WeeklyController', [
  '$scope', '$ionicModal', '$ionicPopup', '$ionicLoading', 'WeekConfig', 'dateSummary', function($scope, $ionicModal, $ionicPopup, $ionicLoading, WeekConfig, dateSummary) {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.summary = [];
    $scope.weeklyConfig = [];
    $scope.dateSummary = [];
    $scope.weekStart = moment().startOf('isoWeek').format('DD-MM-YYYY');
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
        $scope.calSummary();
        return $ionicLoading.hide();
      });
    };
    return $scope.calSummary = function() {
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
  }
]);
