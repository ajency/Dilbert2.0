angular.module 'dilbert.home'

.controller 'WeeklyController',['$scope','$ionicModal','$ionicPopup','$ionicLoading','WeekConfig','dateSummary',($scope,$ionicModal,$ionicPopup,$ionicLoading,WeekConfig,dateSummary)->
		$ionicLoading.show
			template: '<i class="icon ion-loading-c"></i> Loading...'
			animation: 'fade-in'
			showBackdrop: true
			maxWidth: 200
			showDelay: 0
		$scope.summary=[]
		$scope.weeklyConfig = []
		$scope.dateSummary = []
		$scope.weekStart=moment().startOf('isoWeek').format('DD-MM-YYYY');

		dateSummary.getDataSummary()
		.then (summaryData)->
			$scope.dateSummary = summaryData
		

		$scope.setup=(time)->
			if _.isUndefined(time) then time = moment().startOf('isoWeek').format('DD-MM-YYYY');

			WeekConfig.getConfig()
			.then (configData)->
				$scope.weeklyConfig = configData

			dateSummary.getDataSummary()
			.then (summaryData)->
				$scope.dateSummary = summaryData
				$scope.calSummary()
				$ionicLoading.hide()
			


		$scope.calSummary=()->
			$scope.expectedHrs=$scope.weeklyConfig.expected_time_user * $scope.weeklyConfig.expected_time_org 
			console.log $scope.expectedHrs
			$scope.totalHrs=null
			for i in [0..$scope.dateSummary.length-1] 
				$scope.totalHrs += $scope.dateSummary[i].duration
			console.log $scope.totalHrs

			$scope.endSummary=''
			if $scope.expectedHrs > $scope.totalHrs
				$scope.endSummary='Weekly hours not met'
			else
				$scope.endSummary='Extra Hours: '+($scope.totalHrs - $scope.expectedHrs)+' hrs'

			console.log $scope.endSummary
]	