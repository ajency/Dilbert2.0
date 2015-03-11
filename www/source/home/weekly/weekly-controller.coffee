angular.module 'dilbert.home'

.controller 'WeeklyController',['$scope','$ionicModal','$ionicPopup','$ionicLoading','WeekConfig','dateSummary',($scope,$ionicModal,$ionicPopup,$ionicLoading,WeekConfig,dateSummary)->
		
		$ionicLoading.show
			template: '<i class="icon ion-loading-c"></i> Loading...'
			animation: 'fade-in'
			showBackdrop: true
			maxWidth: 200
			showDelay: 0

		$scope.displayPeriod
		$scope.summary=[]
		$scope.weeklyConfig = []
		$scope.dateSummary = []
		$scope.weekStart=moment().startOf('isoWeek').format('DD-MM-YYYY');
		$scope.displayCalender = false

		dateSummary.getDataSummary()
		.then (summaryData)->
			$scope.dateSummary = summaryData
		

		$scope.setup=(time)->
			if _.isUndefined(time) then time = moment().startOf('isoWeek').format('DD-MM-YYYY');
			else $scope.calender.modal.hide()


			WeekConfig.getConfig()
			.then (configData)->
				$scope.weeklyConfig = configData

			dateSummary.getDataSummary()
			.then (summaryData)->
				$scope.dateSummary = summaryData
				calSummary()
				$scope.displayPeriod=moment(time,'DD-MM-YYYY').format('Do MMM YY')+" to "+moment(time,'DD-MM-YYYY').add($scope.weeklyConfig.expected_time_org ,'d').format('Do MMM YY')
				$ionicLoading.hide()
			


		calSummary=()->
			$scope.expectedHrs=$scope.weeklyConfig.expected_time_user * $scope.weeklyConfig.expected_time_org 
			# console.log $scope.expectedHrs
			$scope.totalHrs=null
			for i in [0..$scope.dateSummary.length-1] 
				$scope.totalHrs += $scope.dateSummary[i].duration
			# console.log $scope.totalHrs

			$scope.endSummary=''
			if $scope.expectedHrs > $scope.totalHrs
				$scope.endSummary='Weekly hours not met'
			else
				$scope.endSummary='Extra Hours: '+($scope.totalHrs - $scope.expectedHrs)+' hrs'

			# console.log $scope.endSummary


		$scope.calender =
			display: false

		$ionicModal.fromTemplateUrl 'views/modal-templates/weekly-calendar-template.html',
			backdrop: true
			scope:$scope
		.then (modal)->
			$scope.calModal = modal
			$scope.calender.modal = modal


		$scope.openModal =(modal_name)->
			if modal_name is 'calendar'
				# $scope.displayCalender = true
				$scope.calender.display = true
				$scope.calender.modal.show()

		$scope.closeModal =(modal_name)->
			if modal_name is 'calendar'
				$scope.calender.display = false
				$scope.calender.modal.hide()

]	