angular.module('dilbert.home').factory('WeekConfig', [
  '$q', '$timeout', function($q, $timeout) {
    var WeekConfigAPI, data;
    data = {
      expected_time_user: 8,
      expected_time_org: 5
    };
    return WeekConfigAPI = {
      getConfig: function() {
        var q;
        q = $q.defer();
        q.resolve(data);
        return q.promise;
      }
    };
  }
]).factory('dateSummary', [
  '$q', '$timeout', function($q, $timeout) {
    var data, dateSummaryAPI;
    data = [
      {
        date: '2/3/15',
        duration: 8,
        slots: [
          {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }
        ]
      }, {
        date: '3/3/15',
        duration: 8,
        slots: [
          {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }
        ]
      }, {
        date: '4/3/15',
        duration: 8,
        slots: [
          {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }
        ]
      }, {
        date: '5/3/15',
        duration: 8,
        slots: [
          {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }
        ]
      }, {
        date: '6/3/15',
        duration: 8,
        slots: [
          {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'feature'
          }, {
            slot_type: 'work',
            slot_duration: 120,
            slot_project: 'Dilbert Mobile',
            slot_label: 'bug'
          }
        ]
      }
    ];
    return dateSummaryAPI = {
      getDataSummary: function() {
        var q;
        q = $q.defer();
        q.resolve(data);
        return q.promise;
      }
    };
  }
]);
