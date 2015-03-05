angular.module 'dilbert.home'


.controller 'DailyController',['$rootScope','$scope','$ionicModal','$ionicPopup','DailyAPI','DailyTasks','ModalData','$ionicLoading'
	,($rootScope,$scope,$ionicModal,$ionicPopup,DailyAPI,DailyTasks,ModalData,$ionicLoading)->
		$ionicLoading.show
    		content: 'Loading'
    		animation: 'fade-in'
    		showBackdrop: true
    		maxWidth: 200
    		showDelay: 0
  		$scope.dataAvailable=false
		$rootScope.slotData = []
		$scope.tasks=[]
		$scope.mData=[]
		$scope.searchtext='all'

		DailyAPI.getDailyData()
		.then (dailyData)->
			$rootScope.slotData = dailyData
			$scope.duration = $rootScope.slotData[0].duration
			$scope.dataAvailable=true

		DailyTasks.getDailyTasks()
		.then (dailyTask)->
			$scope.tasks = dailyTask
			$scope.tasks =_.sortBy $scope.tasks, 'taskId'
			$ionicLoading.hide();


		$scope.getCurrentDate = ->
			moment().format("ddd MMM Do YYYY");

		$ionicModal.fromTemplateUrl 'views/modal-templates/calender-template.html',
			scope:$scope
		.then (modal)->
			$scope.calModal = modal

		$ionicModal.fromTemplateUrl 'views/modal-templates/split-template.html',
			backdrop: true
			scope:$scope
		.then (modal)->
			$scope.splitModal = modal

		$ionicModal.fromTemplateUrl 'views/modal-templates/edit-template.html',
			backdrop: true
			scope:$scope
		.then (modal)->
			$scope.editModal = modal

		$scope.openModal =(modal_name)->
			if modal_name is 'calendar' then $scope.calModal.show()
			else if modal_name is 'split'
				$scope.mData=[]
				$scope.mData=ModalData.getData()
				$scope.splitModal.show()
			else if modal_name is 'edit'
				$scope.mData=[]
				$scope.mData=ModalData.getData()
				$scope.editModal.show()

		$scope.closeModal =(modal_name)->
			if modal_name is 'calendar' then $scope.calModal.hide()
			else if modal_name is 'split' then $scope.splitModal.hide()
			else if modal_name is 'edit' then $scope.editModal.hide()

]

.controller 'SplitController',['$rootScope','$scope','ModalData',($rootScope,$scope,ModalData)->
	$scope.splitSlot=(timeMinutes,slotPos,newTask)->
		timeMinutes = Number(timeMinutes)
		slotMinutes = if timeMinutes >0 and timeMinutes < $scope.mData.slotDuration then timeMinutes else ''
		if slotMinutes is '' then return
		newMoment = moment.unix($scope.mData.slotStart)
		if slotPos is 'end'
			newMoment.add $scope.mData.slotDuration-slotMinutes, 'm'
		else
			newMoment.add slotMinutes, 'm'

		console.log newMomentUnix = newMoment.unix()

		if newMomentUnix > $scope.mData.slotStart and newMomentUnix < $scope.mData.slotEnd
			$rootScope.slotData.push
				time:newMomentUnix
				task:newTask
				status:$scope.mData.status
			$scope.closeModal('split')

		$rootScope.slotData = _.sortBy $rootScope.slotData, 'time'
		
]