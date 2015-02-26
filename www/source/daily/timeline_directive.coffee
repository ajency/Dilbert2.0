angular.module('daily.timeline.directive',[])
.directive 'timeLine', ['$rootScope','$parse', '$compile' ,($rootScope,$parse , $compile)->

	restrict:'E'
	templateUrl:"views/directive_templates/timeline.html"

	link: (scope, elem, attrs)->

		timeData = scope.$eval(attrs.slotData)
		timeData = _.sortBy timeData, 'time'

		scope.$watch 'slotData', (newValue)-> 
			console.log 'From Watch'
			console.log newValue
			# scope.$apply ->
			scope.timeData = _.sortBy newValue, 'time'
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
			.time

		getEndTime = ->
			_.last timeData
			.time

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
]