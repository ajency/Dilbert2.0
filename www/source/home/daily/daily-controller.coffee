angular.module 'dilbert.home'


.controller 'DailyController',['$rootScope','$scope','$ionicModal','$ionicPopup','DailyAPI'
	,($rootScope,$scope,$ionicModal,$ionicPopup,DailyAPI)->

		$rootScope.slotData = []

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
			else if modal_name is 'split' then $scope.splitModal.show()

		$scope.closeModal =(modal_name)->
			if modal_name is 'calendar' then $scope.calModal.hide()
			else if modal_name is 'split' then $scope.splitModal.hide()


		

		# $scope.merge =(e,id) ->
		# 	if $ e.target 
		# 		.closest '.time-description' 
		# 		.hasClass 'combine-parent' then return
		# 	if not $ e.target 
		# 		.hasClass 'slot' then return

		# 	isFirst= if id is 0 then true else false
		# 	isLast = if id is $rootScope.slotData.length-2 then true else false

		# 	if isFirst and isLast then return

		# 	$ e.target 
		# 	.closest '.time-description' 
		# 	.addClass 'combine-parent'

		# 	$ e.target 
		# 	.addClass 'combine-current'

		# 	$ e.target 
		# 	.append '<span class="cancel-combine"><i class="icon ion-close"></i></span>'

		# 	if not isFirst
		# 		$('.time-description.combine-parent .slot[data-slot="'+(id-1)+'"]').addClass 'combine-neighbour'

		# 	if not isLast 
		# 		$('.time-description.combine-parent .slot[data-slot="'+(id+1)+'"]').addClass 'combine-neighbour'

		# 	return false


		$scope.split =(e,id,status) ->

	     	if $ e.target 
	     		.closest('.time-description')
	     		.hasClass 'combine-parent' then return

	     	if not $ e.target
	     		.hasClass 'slot' 
	     			return

	     	$scope.status= status
	     	$scope.slotStart = $rootScope.slotData[id].time
	     	$scope.slotEnd = $rootScope.slotData[id+1].time
	     	$scope.displayStart=moment.unix($scope.slotStart).format('h:mm a')
	     	$scope.displayEnd=moment.unix($scope.slotEnd).format('h:mm a')

	     	$scope.slotDuration = moment.unix $scope.slotEnd 
	     		.diff moment.unix($scope.slotStart),'minutes'

	     	$scope.openModal('split')

	 	$scope.splitSlot=(timeMinutes,slotPos,newTask)->
	 		timeMinutes = Number(timeMinutes)
	 		slotMinutes = if timeMinutes >0 and timeMinutes < $scope.slotDuration then timeMinutes else ''
	 		if slotMinutes is '' then return
	 		newMoment = moment.unix($scope.slotStart)
	 		if slotPos is 'end'
	 			newMoment.add $scope.slotDuration-slotMinutes, 'm'
	 		else
	 			newMoment.add slotMinutes, 'm'

	 		newMomentUnix = newMoment.unix()

	 		if newMomentUnix > $scope.slotStart and newMomentUnix < $scope.slotEnd
	 			$rootScope.slotData.push
	 				time:newMomentUnix
	 				task:newTask
	 				status:$scope.status
	 			$scope.closeModal('split')
	 			$rootScope.slotData = _.sortBy $rootScope.slotData, 'time'
	 			

 	
 		
]

