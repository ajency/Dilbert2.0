angular.module 'dilbert.home'


.factory 'DailyAPI', ['$q', '$timeout', '$http' ,($q, $timeout,$http)->

	data =[
		{
			time:1422523800
			duration:'8 hrs'
		}	
		{
			task:'Dilbert Mobile - Object Defination'
			status:'available'
			time:1422526800
			statusType:'work'
			statusSubType:'Project'
		}
		{
			task:'Dilbert Mobile - Object Defination'
			status:'available'
			time:1422528000
			statusType:'work'
			statusSubType:'Project'
		}
		{
			task:'Dilbert Mobile - WireFrame Design'
			status:'idle'
			time:1422534600
			statusType:'work'
			statusSubType:'Training'
		}
		{
			task:'Dilbert Mobile - WireFrame Design'
			status:'available'
			time:1422538200
			statusType:'work'
			statusSubType:'Training'
		}
		{
			task:'Dilbert Mobile - Static Layout'
			status:'offline'
			time:1422541800
			statusType:'break'
			statusSubType:'Lunch'
		}
		{
			task:'Dilbert Mobile - Static Layout'
			status:'idle'
			time:1422546400
			statusType:'work'
			statusSubType:'Project'
		}
		{
			task:'Dilbert Mobile - Bug Fixes'
			status:'available'
			time:1422552600
			statusType:'work'
			statusSubType:'Project'
		}					

	]

	DailyAPI = 

		getDailyData : ->

			# q = $q.defer()

			# $timeout ->
			# 	q.resolve data
			# # , 1500

			# q.promise

			q = $q.defer()

			$http.get 'http://www.mocky.io/v2/5185415ba171ea3a00704eed'
			.success ()->
				q.resolve data
			.error (error)->
				q.reject error

			q.promise

]

.service 'ModalData',[()->
	data={}
	setData:(status,slotStart,slotEnd,displayStart,displayEnd,slotDuration,slotTask,id)->
		data=
			slotStatus:status
			slotStart:slotStart
			slotEnd:slotEnd
			displayStart:displayStart
			displayEnd:displayEnd
			slotDuration:slotDuration
			slotTask:slotTask
			slotId:id

	getData:->
		data
]

.factory 'DailyTasks', ['$q', '$timeout','$http' ,($q, $timeout,$http)->

	data =[
		{
			task:'Dilbert Re render issue'
			label:'bug'
			taskId:1
			project:'Dilbert 2.0'
		}	
		{
			task:'Dilbert Split Functionality'
			label:'feature'
			taskId:2
			project:'Dilbert 2.0'
		}
		{
			task:'Dilbert Mobile - Object Defination'
			label:'feature'
			taskId:3
			project:'Dilbert 2.0'
		}
		{
			task:'Dilbert Mobile - WireFrame Design'
			label:'feature'
			taskId:4
			project:'Dilbert 2.0'
		}
		{
			task:'Dilbert Mobile Merge Functionality'
			label:'feature'
			taskId:5
			project:'Dilbert 2.0'
		}
		{
			task:'Dilbert Mobile CSS'
			label:'feature'
			taskId:6
			project:'Dilbert 2.0'
		}
		{
			task:'Dilbert Mobile - Static Layout'
			label:'feature'
			taskId:8
			project:'Dilbert 2.0'
		}
		{
			task:'Dilbert Mobile - Bug Fixes'
			label:'bug'
			taskId:7
			project:'Dilbert 2.0'
		}					

	]

	TaskAPI = 

		getDailyTasks : ->

			# q = $q.defer()

			# $timeout ->
			# 	q.resolve data
			# # , 1500

			# q.promise

			q = $q.defer()

			$http.get 'http://www.mocky.io/v2/5185415ba171ea3a00704eed'
			.success ()->
				q.resolve data
			.error (error)->
				q.reject error

			q.promise

]