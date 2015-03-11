angular.module('dilbert.home').directive('serialGraph', [
  '$rootScope', '$parse', '$compile', '$ionicPopup', function($rootScope, $parse, $compile, $ionicPopup) {
    return {
      restrict: 'E',
      template: '<div><div id="chartdiv" style="width: 100%; height: 400px; font-size:11px"></div></div>',
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
        return AmCharts.makeChart("chartdiv", {
          type: "serial",
          theme: "none",
          creditsPosition: "top-right",
          dataDateFormat: "MM-DD-YYYY",
          panEventsEnabled: false,
          dataProvider: dataProvider,
          "gridAboveGraphs": true,
          "startDuration": 1,
          "graphs": [
            {
              "balloonText": "[[category]]: <b>[[value]]</b> hrs",
              "fillAlphas": 1,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "duration",
              "fillColors": "#FFB03B"
            }
          ],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "day",
          "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20,
            "labelRotation": 90
          }
        });
      }
    };
  }
]).directive('donutGraph', [
  '$rootScope', '$parse', '$compile', '$ionicPopup', function($rootScope, $parse, $compile, $ionicPopup) {
    return {
      restrict: 'E',
      template: '<div><div id="chartdiv" style="width: 100%; height: 400px; font-size:11px"></div>',
      replace: true,
      link: function(scope, elem, attrs) {
        var dataProvider, filterTasks, graphdata;
        dataProvider = [];
        graphdata = scope.$eval(attrs.graphData);
        AmCharts.makeChart("chartdiv", {
          type: "pie",
          theme: "none",
          panEventsEnabled: false,
          dataProvider: [
            {
              "title": "New",
              "value": 4852
            }, {
              "title": "Returning",
              "value": 9899
            }
          ],
          titleField: "title",
          valueField: "value",
          labelRadius: 5,
          legend: {
            align: "center",
            markerType: "circle"
          },
          radius: "42%",
          innerRadius: "60%",
          labelText: "[[title]]",
          responsive: {
            enabled: true,
            addDefaultRules: true
          }
        });
        scope.tasks = [];
        return filterTasks = function() {
          var i, j, _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = graphdata.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push((function() {
              var _j, _ref1, _results1;
              _results1 = [];
              for (j = _j = 0, _ref1 = graphdata[i].slots.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
                _results1.push(console.log);
              }
              return _results1;
            })());
          }
          return _results;
        };
      }
    };
  }
]);
