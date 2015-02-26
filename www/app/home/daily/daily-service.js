angular.module('dilbert.home').factory('DailyAPI', [
  '$q', '$timeout', function($q, $timeout) {
    var DailyAPI, data;
    data = [
      {
        time: 1422523800,
        duration: '8 hrs'
      }, {
        task: 'Dilbert Mobile - Object Defination',
        status: 'available',
        time: 1422526800
      }, {
        task: 'Dilbert Mobile - Object Defination',
        status: 'available',
        time: 1422528000
      }, {
        task: 'Dilbert Mobile - WireFrame Design',
        status: 'idle',
        time: 1422534600
      }, {
        task: 'Dilbert Mobile - WireFrame Design',
        status: 'available',
        time: 1422538200
      }, {
        task: 'Dilbert Mobile - Static Layout',
        status: 'offline',
        time: 1422541800
      }, {
        task: 'Dilbert Mobile - Static Layout',
        status: 'idle',
        time: 1422546400
      }, {
        task: 'Dilbert Mobile - Bug Fixes',
        status: 'available',
        time: 1422552600
      }
    ];
    return DailyAPI = {
      getDailyData: function() {
        var q;
        q = $q.defer();
        $timeout(function() {
          return q.resolve(data);
        }, 1500);
        return q.promise;
      }
    };
  }
]);
