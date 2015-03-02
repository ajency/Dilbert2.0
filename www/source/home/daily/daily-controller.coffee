angular.module 'dilbert.home'


.controller 'DailyController',['$rootScope','$scope','$ionicModal','$ionicPopup','DailyAPI','ModalData'
	,($rootScope,$scope,$ionicModal,$ionicPopup,DailyAPI,ModalData)->

		$rootScope.slotData = []
		$scope.mData=[]
		DailyAPI.getDailyData()
		.then (dailyData)->
			$rootScope.slotData = dailyData
			$scope.duration = $rootScope.slotData[0].duration

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

		$scope.openModal =(modal_name)->
			if modal_name is 'calendar' then $scope.calModal.show()
			else if modal_name is 'split'
				$scope.mData=[]
				$scope.mData=ModalData.getData()
				$scope.splitModal.show()

		$scope.closeModal =(modal_name)->
			if modal_name is 'calendar' then $scope.calModal.hide()
			else if modal_name is 'split' then $scope.splitModal.hide()

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

		newMomentUnix = newMoment.unix()

		if newMomentUnix > $scope.mData.slotStart and newMomentUnix < $scope.mData.slotEnd
			$rootScope.slotData.push
				time:newMomentUnix
				task:newTask
				status:$scope.mData.status
			$scope.closeModal('split')
			$rootScope.slotData = _.sortBy $rootScope.slotData, 'time'
]