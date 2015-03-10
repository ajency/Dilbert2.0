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
]);
