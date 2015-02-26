angular.module 'dilbert.home'

.directive 'timeLine', ['$rootScope','$parse', '$compile' ,($rootScope,$parse , $compile)->

	restrict:'E'
	templateUrl:"views/directive-templates/timeline.html"

	link: (scope, elem, attrs)->

		timeData = scope.$eval(attrs.slotData)
		timeData = _.sortBy timeData, 'time'

		scope.$watch attrs.slotData, (newValue)-> 
			console.log newValue
			timeData = _.sortBy newValue, 'time'
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

]

