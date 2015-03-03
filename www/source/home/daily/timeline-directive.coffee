angular.module 'dilbert.home'

.directive 'timeLine', ['$rootScope','$parse', '$compile' ,'ModalData',($rootScope,$parse , $compile,ModalData)->

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

	     	if $ e.target 
	     		.closest('.time-description')
	     		.hasClass 'combine-parent' then return

	     	if not $ e.target
	     		.hasClass 'slot' 
	     			return

	     
	     	slotStart = $rootScope.slotData[id].time
	     	slotEnd = $rootScope.slotData[id+1].time
	     	task = $rootScope.slotData[id+1].task
	     	displayStart=moment.unix(slotStart).format('h:mm a')
	     	displayEnd=moment.unix(slotEnd).format('h:mm a')
	     	slotDuration = moment.unix slotEnd 
	     		.diff moment.unix(slotStart),'minutes'
	     	ModalData.setData status,slotStart,slotEnd,displayStart,displayEnd,slotDuration,task
	     	scope.openModal('split')

		scope.merge =(e,id) ->
			scope.id=id
			if $ e.target 
				.closest '.time-description' 
				.hasClass 'combine-parent' then return
			if not $ e.target 
				.hasClass 'slot' then return

			isFirst= if id is 0 then true else false
			isLast = if id is $rootScope.slotData.length-2 then true else false

			if isFirst and isLast then return
			console.log  isFirst+' '+isLast
			$ e.target 
			.closest '.time-description' 
			.addClass 'combine-parent'

			$ e.target 
			.addClass 'combine-current'

			$ e.target 
			.closest '.taskInfo'
			.append '<span class="cancel-combine" style="float:right;padding-top: 65px;"><i class="icon ion-close"></i></span>'

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
			slotNo=scope.id
			neighbourSlot = $ e.target 
			.attr 'data-slot'
			neighbourSlot=Number neighbourSlot
			if neighbourSlot < slotNo
				$rootScope.slotData
				.splice slotNo,1
			else if neighbourSlot > slotNo
				$rootScope.slotData
				.splice slotNo+1, 1
			scope.$apply()
			console.log 'merge'
			console.log $rootScope.slotData
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

