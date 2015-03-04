angular.module 'dilbert.home'

.directive 'timeLine', ['$rootScope','$parse', '$compile' ,'ModalData','$ionicPopup',($rootScope,$parse , $compile,ModalData,$ionicPopup)->

	restrict:'E'
	templateUrl:"views/directive-templates/timeline.html"
	replace: true

	link: (scope, elem, attrs)->

		timeData = $rootScope.slotData
		timeData = _.sortBy timeData, 'time'

		scope.$watch 'slotData', (newValue)-> 
			timeData = newValue
			scope.timeData = timeData
		, true

		timeLineWidth = $ elem
						.find '.timeline-interval-region'
						.width()

		
		#Pixel per second
		shortestSlot = 100000
		for time,i in timeData
			if i is 0 then continue
			if shortestSlot > time - timeData[i-1].time
				shortestSlot = time - timeData[i-1].time
		pps = 40/shortestSlot
		ppsTotal = timeLineWidth/(timeData[timeData.length-1].time-timeData[0].time)
		pixelPerSecond = if pps > ppsTotal then pps else ppsTotal

		
		scope.getUnixTime = (time)->
			moment.unix(time).format 'H:mm'

		scope.getSlotPercentage = (time, index)->
			slotTime = time - timeData[index-1].time
			percentage = Math.floor(slotTime * pixelPerSecond)
			"#{percentage}px"

		scope.getTask = (index)->
			if timeData[index].status is 'offline'
				task = 'Break'
			else
				task = timeData[index].task
			task

		scope.getSlotDifference = (index)->
			slotStart = timeData[index-1].time	
			slotEnd = timeData[index].time
			duration = moment.unix(slotEnd).diff(slotStart*1000)
			diff = ''
			if moment.duration(duration).hours()
				diff += "#{moment.duration(duration).hours()} hr"
			if moment.duration(duration).hours() and moment.duration(duration).minutes()
				diff += ', '
			if moment.duration(duration).minutes()
				diff += "#{moment.duration(duration).minutes()} min"

			diff

		scope.getColor=(status)->
			if status is 'available'
				color = '#468966'

			else if status is 'idle'	
				color = '#FFB03B'

			else 
				color = '#4B4E50'

			color

		scope.split =(e,id,status) ->
			console.log id
			if $ e.target 
				.parent().parent().parent()
	     		.closest('.time-description')
	     		.hasClass 'combine-parent' then return

			if not $ e.target
				.parent().parent().parent()
	     		.hasClass 'slot' 
	     			return

	     
			slotStart = $rootScope.slotData[id].time
			slotEnd = $rootScope.slotData[id+1].time
			displayStart=moment.unix(slotStart).format('h:mm a')
			displayEnd=moment.unix(slotEnd).format('h:mm a')
			slotDuration = moment.unix slotEnd
			.diff moment.unix(slotStart),'minutes'
			ModalData.setData status,slotStart,slotEnd,displayStart,displayEnd,slotDuration
			scope.openModal('split')

		scope.merge =(e,id) ->
			scope.id=id

			if $ e.target
				.parent().parent().parent() 
				.closest '.time-description' 
				.hasClass 'combine-parent' then return
			if not $ e.target 
				.parent().parent().parent() 
				.hasClass 'slot' then return

			isFirst= if id is 0 then true else false
			isLast = if id is $rootScope.slotData.length-2 then true else false

			if isFirst and isLast then return
			$ e.target 
			.parent().parent().parent()
			.closest '.time-description' 
			.addClass 'combine-parent'

			$ e.target
			.parent().parent().parent()
			.addClass 'combine-current'

			$ e.target
			.parent().parent().parent()
			.closest '.taskInfo'
			.append '<span class="cancel-combine" style="float:right;padding-top: 65px;"><i class="icon ion-close-round" style="color:white"></i></span>'

			if not isFirst
				$('.time-description.combine-parent .slot[data-slot="'+(id-1)+'"]').addClass 'combine-neighbour'

			if not isLast 
				$('.time-description.combine-parent .slot[data-slot="'+(id+1)+'"]').addClass 'combine-neighbour'

			$ '.time-description.combine-parent .slot.combine-neighbour'
			.on 'tap',combineSlots.bind id,e

			$ '.time-description.combine-parent .slot.combine-current .cancel-combine'
			.on 'tap',stopCombineSlot.bind e
			return false

		combineSlots = (slotNo, e)->
			scope.text = 
				data: ''
			slotNo=scope.id
			neighbourSlot = $ e.target 
			.attr 'data-slot'
			neighbourSlot=Number neighbourSlot

			scope.clickedSlot=
				task:$rootScope.slotData[slotNo+1].task
				duration:moment.unix $rootScope.slotData[slotNo+1].time 
	     		.diff moment.unix($rootScope.slotData[slotNo].time),'minutes'
	     		status:$rootScope.slotData[slotNo+1].status

			scope.nSlot=
				task:$rootScope.slotData[neighbourSlot+1].task
				duration:moment.unix $rootScope.slotData[neighbourSlot+1].time 
	     		.diff moment.unix($rootScope.slotData[neighbourSlot].time),'minutes'
	     		status:$rootScope.slotData[neighbourSlot+1].status	

			$ionicPopup.show
				title:'Merge Summary'
				template:'<div>'+
				"<h4>Clicked Slot</h4>"+
				"<p class='item item-input'>Task: #{scope.clickedSlot.task}</p>"+
				"<p class='item item-input'>Duration: #{scope.clickedSlot.duration} minutes</p>"+

				"<h4>Slot to be merged with</h4>"+
				"<p class='item item-input'>Task: #{scope.nSlot.task}</p>"+
				"<p class='item item-input'>Duration: #{scope.nSlot.duration} minutes</p><br>"+

				"<label class='item item-input item-select'><div class='input-label'>Task for Merged slot</div>"+
					"<select ng-model='text.data' selected><option>#{scope.clickedSlot.task}</option><option>#{scope.nSlot.task}</option></select></label>"+
				"</div>"
				scope:scope
				buttons:[
					{ 
						text: 'Cancel'
						onTap:(e)->
							stopCombineSlot e
					},
					{
						text:'Confirm'
						type: 'button-positive'
						onTap:(e)->
							if scope.text.data is ''
								scope.text.data=scope.clickedSlot.task
								
							status=''
							if scope.clickedSlot.status is 'offline' || scope.nSlot.status is 'offline' then status='offline'
							else if scope.clickedSlot.status is 'idle' && scope.nSlot.status is 'idle' then status='idle'
							else if (scope.clickedSlot.status is 'idle' && scope.nSlot.status is 'available') || (scope.clickedSlot.status is 'available' && scope.nSlot.status is 'idle') then status='idle'
							else if scope.clickedSlot.status is 'available' && scope.nSlot.status is 'available' then status='available'

							if neighbourSlot < slotNo
								
								$rootScope.slotData
								.splice slotNo,1
								$rootScope.slotData[slotNo].task=scope.text.data
								$rootScope.slotData[slotNo].status=status
							else if neighbourSlot > slotNo
								
								$rootScope.slotData
								.splice slotNo+1, 1
								$rootScope.slotData[slotNo+1].task=scope.text.data
								$rootScope.slotData[slotNo+1].status=status
							console.log 'merge executed'
					}
				]

			.then (res)->
				console.log 'Merge closed'
			stopCombineSlot e



		stopCombineSlot = (e)->
			$ '.time-description.combine-parent .slot.combine-current .cancel-combine' 
			.off()
			.remove()

			$ '.time-description.combine-parent .slot.combine-neighbour'
			.off 'tap' 
			.removeClass 'combine-neighbour'

			$ '.time-description.combine-parent .slot.combine-current'
			.removeClass 'combine-current'

			$ '.time-description.combine-parent '
			.removeClass 'combine-parent'

]

