angular.module 'dilbert.home'

.directive 'serialGraph', ['$rootScope','$parse', '$compile' ,'$ionicPopup',($rootScope,$parse , $compile,$ionicPopup)->
	
	restrict:'E'
	template:'<div><div id="chartdiv" style="width: 100%; height: 400px; font-size:11px"></div></div>'
	replace: true
	link: (scope, elem, attrs)->
		dataProvider=[]
		graphdata= scope.$eval(attrs.graphData)
		for i in [0..graphdata.length-1]
			dataProvider.push
				day:graphdata[i].date
				duration:graphdata[i].duration

		AmCharts.makeChart "chartdiv",
			type: "serial"
			theme: "none"
			creditsPosition :"top-right";
			dataDateFormat: "MM-DD-YYYY",
			panEventsEnabled:false
			dataProvider: dataProvider
			"gridAboveGraphs": true,
			"startDuration": 1,
			"graphs": [{
				"balloonText": "[[category]]: <b>[[value]]</b> hrs",
				"fillAlphas": 1,
				"lineAlpha": 0.2,
				"type": "column",
				"valueField": "duration"
				"fillColors": "#FFB03B"     
			}],
			"chartCursor": {
				"categoryBalloonEnabled": false,
				"cursorAlpha": 0,
				"zoomable": false
			},
			"categoryField": "day",
			"categoryAxis": {
				"gridPosition": "start",
				"gridAlpha": 0,
				"tickPosition":"start",
				"tickLength":20
				"labelRotation":90
			}

]

.directive 'donutGraph', ['$rootScope','$parse', '$compile' ,'$ionicPopup',($rootScope,$parse , $compile,$ionicPopup)->
	
	restrict:'E'
	template:'<div><div id="chartdiv" style="width: 100%; height: 400px; font-size:11px"></div>'
	replace: true
	link: (scope, elem, attrs)->
		dataProvider=[]
		graphdata= scope.$eval(attrs.graphData)
		
		AmCharts.makeChart "chartdiv", 
			type: "pie",
			theme: "none",
			panEventsEnabled:false
			dataProvider: [{
				"title": "New",
				"value": 4852
			}, {
				"title": "Returning",
				"value": 9899
			}],
			titleField: "title",
			valueField: "value",
			labelRadius: 5,
			legend: 
				align: "center",
				markerType: "circle"
			radius: "42%",
			innerRadius: "60%",
			labelText: "[[title]]"
			responsive:
				enabled: true
				addDefaultRules: true
		
		scope.tasks = []
		
		filterTasks = ->
			for i in [0..graphdata.length-1]
				for j in [0..graphdata[i].slots.length-1]
					console.log 

]