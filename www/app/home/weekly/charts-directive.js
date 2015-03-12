angular.module('dilbert.home').directive('serialGraph', [
  '$rootScope', '$parse', '$compile', '$ionicPopup', function($rootScope, $parse, $compile, $ionicPopup) {
    return {
      restrict: 'E',
      template: '<div><div id="chartdiv-serial" style="width: 100%; height: 400px; font-size:11px"></div></div>',
      replace: true,
      link: function(scope, elem, attrs) {
        var dataProvider, graphdata, i, _i, _ref;
        dataProvider = [];
        graphdata = scope.$eval(attrs.graphData);
        for (i = _i = 0, _ref = graphdata.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          dataProvider.push({
            day: graphdata[i].date,
            duration: graphdata[i].duration
          });
        }
        return AmCharts.makeChart("chartdiv-serial", {
          type: "serial",
          theme: "none",
          creditsPosition: "top-right",
          dataDateFormat: "MM-DD-YYYY",
          panEventsEnabled: false,
          dataProvider: dataProvider,
          gridAboveGraphs: true,
          startDuration: 1,
          graphs: [
            {
              balloonText: "[[category]]: <b>[[value]]</b> hrs",
              fillAlphas: 1,
              lineAlpha: 0.2,
              type: "column",
              valueField: "duration",
              fillColors: "#FFB03B"
            }
          ],
          chartCursor: {
            categoryBalloonEnabled: false,
            cursorAlpha: 0,
            zoomable: false
          },
          categoryField: "day",
          categoryAxis: {
            gridPosition: "start",
            gridAlpha: 0,
            tickPosition: "start",
            tickLength: 20,
            labelRotation: 90
          }
        });
      }
    };
  }
]).directive('donutGraph', [
  '$rootScope', '$parse', '$compile', '$ionicPopup', function($rootScope, $parse, $compile, $ionicPopup) {
    return {
      restrict: 'E',
      template: '<div><div id="dilbertDonutChart" style="width: 100%; height: 500px; font-size:10px"></div>',
      replace: true,
      scope: {
        graphData: '=',
        type: '='
      },
      link: function(scope, element, attrs) {
        var dataProvider, formatPerc, formatTime, graphdata, i, index, j, labels, perc, tasks, total, _i, _j, _k, _l, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        graphdata = scope.graphData;
        dataProvider = [];
        tasks = [];
        labels = [];
        for (i = _i = 0, _ref = graphdata.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          for (j = _j = 0, _ref1 = graphdata[i].slots.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            index = _.findIndex(tasks, {
              'p_name': graphdata[i].slots[j].slot_project
            });
            if (index !== -1) {
              tasks[index].p_duration += graphdata[i].slots[j].slot_duration;
            } else {
              tasks.push({
                p_name: graphdata[i].slots[j].slot_project,
                p_duration: graphdata[i].slots[j].slot_duration
              });
            }
          }
        }
        for (i = _k = 0, _ref2 = graphdata.length - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
          for (j = _l = 0, _ref3 = graphdata[i].slots.length - 1; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; j = 0 <= _ref3 ? ++_l : --_l) {
            index = _.findIndex(labels, {
              'p_label': graphdata[i].slots[j].slot_label
            });
            if (index !== -1) {
              labels[index].p_duration += graphdata[i].slots[j].slot_duration;
            } else {
              labels.push({
                p_label: graphdata[i].slots[j].slot_label,
                p_duration: graphdata[i].slots[j].slot_duration
              });
            }
          }
        }
        total = 0;
        for (i = _m = 0, _ref4 = labels.length - 1; 0 <= _ref4 ? _m <= _ref4 : _m >= _ref4; i = 0 <= _ref4 ? ++_m : --_m) {
          total += labels[i].p_duration;
        }
        for (i = _n = 0, _ref5 = labels.length - 1; 0 <= _ref5 ? _n <= _ref5 : _n >= _ref5; i = 0 <= _ref5 ? ++_n : --_n) {
          perc = (labels[i].p_duration / total) * 100;
          labels[i].p_duration = Math.floor(perc);
        }
        formatTime = function(time) {
          var num;
          num = moment.duration(time.value, 'm').asHours();
          return num.toFixed(2) + " Hours";
        };
        formatPerc = function(perc) {
          return perc.value + "%";
        };
        return scope.$watch('type', function(value) {
          if (value === 'Project') {
            return AmCharts.makeChart("dilbertDonutChart", {
              type: "pie",
              theme: "none",
              panEventsEnabled: false,
              dataProvider: tasks,
              titleField: "p_name",
              valueField: "p_duration",
              labelRadius: 5,
              legend: {
                align: "center",
                markerType: "circle",
                valueFunction: formatTime
              },
              radius: "42%",
              innerRadius: "60%",
              labelText: "[[title]]",
              responsive: {
                enabled: true,
                addDefaultRules: true
              }
            });
          } else if (value === 'Label') {
            return AmCharts.makeChart("dilbertDonutChart", {
              type: "pie",
              theme: "none",
              panEventsEnabled: false,
              dataProvider: labels,
              titleField: "p_label",
              valueField: "p_duration",
              labelRadius: 5,
              legend: {
                align: "center",
                markerType: "circle",
                valueFunction: formatPerc
              },
              radius: "42%",
              innerRadius: "60%",
              labelText: "[[title]]",
              responsive: {
                enabled: true,
                addDefaultRules: true
              }
            });
          }
        });
      }
    };
  }
]);
