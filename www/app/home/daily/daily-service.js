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
        });
        return q.promise;
      }
    };
  }
]).service('ModalData', [
  function() {
    var data;
    data = {};
    return {
      setData: function(status, slotStart, slotEnd, displayStart, displayEnd, slotDuration) {
        return data = {
          status: status,
          slotStart: slotStart,
          slotEnd: slotEnd,
          displayStart: displayStart,
          displayEnd: displayEnd,
          slotDuration: slotDuration
        };
      },
      getData: function() {
        return data;
      }
    };
  }
]).factory('DailyTasks', [
  '$q', '$timeout', function($q, $timeout) {
    var TaskAPI, data;
    data = [
      {
        task: 'Dilbert Re render issue',
        label: 'bug',
        taskId: 1,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Split Functionality',
        label: 'feature',
        taskId: 2,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Mobile - Object Defination',
        label: 'feature',
        taskId: 3,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Mobile - WireFrame Design',
        label: 'feature',
        taskId: 4,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Mobile Merge Functionality',
        label: 'feature',
        taskId: 5,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Mobile Merge Functionality',
        label: 'feature',
        taskId: 6,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Mobile - Static Layout',
        label: 'feature',
        taskId: 8,
        project: 'Dilbert 2.0'
      }, {
        task: 'Dilbert Mobile - Bug Fixes',
        label: 'bug',
        taskId: 7,
        project: 'Dilbert 2.0'
      }
    ];
    return TaskAPI = {
      getDailyTasks: function() {
        var q;
        q = $q.defer();
        $timeout(function() {
          return q.resolve(data);
        });
        return q.promise;
      }
    };
  }
]);
