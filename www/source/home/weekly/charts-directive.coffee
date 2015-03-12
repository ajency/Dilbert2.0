 angular.module 'dilbert.home'

.directive 'serialGraph', ['$rootScope','$parse', '$compile' ,'$ionicPopup',($rootScope,$parse , $compile,$ionicPopup)->
	
	restrict:'E'
	template:'<div><div id="chartdiv-serial" style="width: 100%; height: 400px; font-size:11px"></div></div>'
	replace: true
	link: (scope, elem, attrs)->
		dataProvider=[]
		graphdata= scope.$eval(attrs.graphData)

		for i in [0..graphdata.length-1]
			dataProvider.push
				day:graphdata[i].date
				duration:graphdata[i].duration

		
		AmCharts.makeChart "chartdiv-serial",
			type: "serial"
			theme: "none"
			creditsPosition :"top-right";
			dataDateFormat: "MM-DD-YYYY",
			panEventsEnabled:false
			dataProvider: dataProvider
			gridAboveGraphs: true,
			startDuration: 1,
			graphs: [{
				balloonText: "[[category]]: <b>[[value]]</b> hrs",
				fillAlphas: 1,
				lineAlpha: 0.2,
				type: "column",
				valueField: "duration"
				fillColors: "#FFB03B"
			}],

			chartCursor: {
				categoryBalloonEnabled: false,
				cursorAlpha: 0,
				zoomable: false
			},
			categoryField: "day",
			categoryAxis: {
				gridPosition: "start",
				gridAlpha: 0,
				tickPosition:"start",
				tickLength:20
				labelRotation:90
			}

]

.directive 'donutGraph', ['$rootScope', '$parse', '$compile' ,'$ionicPopup',($rootScope,$parse , $compile, $ionicPopup)->
	
	restrict:'E'
	template:'<div><div id="dilbertDonutChart" style="width: 100%; height: 500px; font-size:10px"></div>'
	replace: true
	scope:
		graphData: '='
		type: '='
	
	link: (scope, element, attrs)->
		graphdata = scope.graphData
		dataProvider = [] 
		tasks = []
		labels = []

		#Filter tasks
		for i in [0..graphdata.length-1]

			for j in [0..graphdata[i].slots.length-1]
				index = _.findIndex(tasks,{'p_name':graphdata[i].slots[j].slot_project})

				if index != -1
					tasks[index].p_duration+=graphdata[i].slots[j].slot_duration
				else tasks.push 
					p_name:graphdata[i].slots[j].slot_project
					p_duration:graphdata[i].slots[j].slot_duration

		
		#Filter labels
		for i in [0..graphdata.length-1]

			for j in [0..graphdata[i].slots.length-1]
				index = _.findIndex(labels,{'p_label':graphdata[i].slots[j].slot_label})

				if index != -1
					labels[index].p_duration+=graphdata[i].slots[j].slot_duration
				else 
					labels.push 
						p_label:graphdata[i].slots[j].slot_label
						p_duration:graphdata[i].slots[j].slot_duration
		total=0				
		for i in [0..labels.length-1]
			total+=labels[i].p_duration

		for i in [0..labels.length-1]
			perc=(labels[i].p_duration/total)*100
			labels[i].p_duration=Math.floor perc

						
		formatTime = (time)->
			num=moment.duration(time.value,'m').asHours()
			num.toFixed(2) + " Hours"

		formatPerc = (perc)->
			perc.value+"%"


		scope.$watch 'type', (value)->

			if value is 'Project'
				AmCharts.makeChart "dilbertDonutChart", 
					type: "pie",
					theme: "none",
					panEventsEnabled:false
					dataProvider: tasks
					titleField: "p_name",
					valueField: "p_duration",
					labelRadius: 5,
					legend: 
						align: "center",
						markerType: "circle"
						valueFunction: formatTime
					radius: "42%",
					innerRadius: "60%",
					labelText: "[[title]]"
					responsive:
						enabled: true
						addDefaultRules: true

			else if value is 'Label'		
				AmCharts.makeChart "dilbertDonutChart", 
					type: "pie",
					theme: "none",
					panEventsEnabled:false
					dataProvider: labels
					titleField: "p_label",
					valueField: "p_duration",
					labelRadius: 5,
					legend: 
						align: "center",
						markerType: "circle"
						valueFunction: formatPerc
					radius: "42%",
					innerRadius: "60%",
					labelText: "[[title]]"
					responsive:
						enabled: true
						addDefaultRules: true


]