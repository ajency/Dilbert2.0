angular.module('daily.service', []).service('DailyService', [
  '$http', '$scope', function($http, $scope) {
    var timeLogs;
    $scope.data = [
      {
        starttime: 1422523800
      }, timeLogs = [
        {
          task: 'Dilbert Mobile - Object Defination',
          status: 'available',
          endtime: 1422526800
        }, {
          task: 'Dilbert Mobile - Object Defination',
          status: 'available',
          endtime: 1422528000
        }, {
          task: 'Dilbert Mobile - WireFrame Design',
          status: 'available',
          endtime: 1422534600
        }, {
          task: 'Dilbert Mobile - WireFrame Design',
          status: 'available',
          endtime: 1422538200
        }, {
          task: 'Dilbert Mobile - Static Layout',
          status: 'available',
          endtime: 1422541800
        }, {
          task: 'Dilbert Mobile - Static Layout',
          status: 'available',
          endtime: 1422546400
        }, {
          task: 'Dilbert Mobile - Bug Fixes',
          status: 'available',
          endtime: 1422552600
        }
      ]
    ];
    return this.getDailyData = function() {
      return $scope.data;
    };
  }
]);
