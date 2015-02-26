angular.module('daily.controller',[])
.controller 'DailyController',['$rootScope','$scope','$ionicModal','$ionicPopup','DailyService',($rootScope,$scope,$ionicModal,$ionicPopup,DailyService)->
	
	$rootScope.slotData=[]


	$rootScope.slotData=DailyService.getDailyData()
	$scope.duration = $rootScope.slotData[0].duration

	$scope.getCurrentDate = ->
		moment().format("ddd MMM Do YYYY");

	$ionicModal.fromTemplateUrl 'views/modal_templates/calender_template.html',
		scope:$scope
	.then (modal)->
		$scope.calModal = modal

	$ionicModal.fromTemplateUrl 'views/modal_templates/split_template.html',
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


	

	$scope.merge =(e,id) ->
		$ionicPopup.alert
     		title: 'Merge',
     		template: "Merge #{id}"
     	.then (res)->
     		console.log "merge #{id}"
     		console.log e

	$scope.split =(e,id) ->

     	if $ e.target 
     		.closest('.time-description')
     		.hasClass 'combine-parent' then return

     	if not $ e.target
     		.hasClass 'slot' 
     			return

     	slotNo = parseInt $(e.target).attr 'data-slot'
     	$scope.slotStart = $scope.slotData[slotNo].time
     	$scope.slotEnd = $scope.slotData[slotNo+1].time
     	$scope.displayStart=moment.unix($scope.slotStart).format('h:mm a')
     	$scope.displayEnd=moment.unix($scope.slotEnd).format('h:mm a')

     	$scope.slotDuration = moment.unix $scope.slotEnd 
     		.diff moment.unix($scope.slotStart),'minutes'
     	$scope.openModal('split')

 	$scope.splitSlot=(timeMinutes,slotPos,newTask)->
 		console.log 'split'
 		console.log timeMinutes+" "+slotPos+" "+newTask
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
 				color: '#000000'
 		
]