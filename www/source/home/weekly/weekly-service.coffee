angular.module 'dilbert.home'

.factory 'WeekConfig', ['$q', '$timeout','$http' ,($q, $timeout, $http)->

	data={
		expected_time_user:8
		expected_time_org:5
	}

	WeekConfigAPI = 

		getConfig : ->
			q = $q.defer()

			$http.get 'http://www.mocky.io/v2/5185415ba171ea3a00704eed'
			.then ->
				q.resolve data
			, (error)->
				q.reject error

			q.promise

]

.factory 'dateSummary', ['$q', '$timeout', '$http',($q, $timeout,$http)->

	data=[
		{
			date:'2/3/15'
			duration:10
			slots:[
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'bug'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 1'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 2'
					slot_label:'bug'
				}
			]
		},
		{
			date:'3/3/15'
			duration:9
			slots:[
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'bug'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 1'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 3'
					slot_label:'bug'
				}
			]
		},
		{
			date:'4/3/15'
			duration:8
			slots:[
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'bug'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 2'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 3'
					slot_label:'bug'
				}
			]
		},
		{
			date:'5/3/15'
			duration:8
			slots:[
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'bug'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 1'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj 1'
					slot_label:'bug'
				}
			]
		},
		{
			date:'6/3/15'
			duration:9
			slots:[
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Dilbert Mobile'
					slot_label:'bug'
				},
				{
					slot_type:'work'
					slot_duration:140
					slot_project:'Dilbert Mobile'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj'
					slot_label:'feature'
				},
				{
					slot_type:'work'
					slot_duration:120
					slot_project:'Proj'
					slot_label:'bug'
				}
			]
		}
	]

	dateSummaryAPI = 

		getDateSummary : ->
			q = $q.defer()

			$http.get 'http://www.mocky.io/v2/5185415ba171ea3a00704eed'
			.then ->
				q.resolve data
			, (error)->
				q.reject error

			q.promise

]