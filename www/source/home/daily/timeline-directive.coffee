angular.module 'daily.timeline.directive',[]

.directive 'timeLine', ['$rootScope','$parse', '$compile' ,($rootScope,$parse , $compile)->

	restrict:'E'
	templateUrl:"views/directive-templates/timeline.html"

	link: (scope, elem, attrs)->

		timeData = scope.$eval(attrs.slotData)
		timeData = _.sortBy timeData, 'time'

		scope.$watch 'slotData', (newValue)-> 
			console.log 'From Watch'
			console.log newValue
			# scope.$apply ->
			scope.timeData = _.sortBy newValue, 'time'
			console.log scope.timeData
		, true

		timeLineIntervalRegionWidth = $ elem
										.find '.timeline-interval-region'
										.width()

		
		#Pixel per windows
		shortestSlot = 100000
		for time,i in timeData
			if i is 0 then continue
			if shortestSlot > time - timeData[i-1].time
				shortestSlot = time - timeData[i-1].time
		pps = 40/shortestSlot
		ppsTotal = timeLineIntervalRegionWidth/(timeData[timeData.length-1].time-timeData[0].time)
		pixelPerSecond = if pps > ppsTotal then pps else ppsTotal

		

		
		getStartTime = ->
			_.first timeData
			.starttime

		getEndTime = ->
			_.last timeData
			.endtime

		scope.getUnixTime = (time)->
			moment.unix(time).format 'H:mm'

		scope.getSlotPercentage = (time, index)->
			slotTime = time - timeData[index-1].time
			percentage = Math.floor(slotTime * pixelPerSecond)
			"#{percentage}px"

		scope.getSlotDifference = (index)->
			console.log 'getSlotDifference'
		
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
			color
			if status is 'available'
				color = '#468966'

			else if status is 'idle'	
				color = '#FFB03B'

			else 
				color = '#4B4E50'

			color

]