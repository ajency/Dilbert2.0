angular.module 'dilbert.home'


.directive 'timeLine', ['$rootScope', '$parse', ($rootScope, $parse)->

	restrict:'E'
	templateUrl:"views/directive_templates/timeline.html"
	scope: 
		slotData: '='

	link: (scope, elem, attrs)->

		timeData = scope.slotData
		console.log timeData
		scope.timeData = _.sortBy timeData, 'time'

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

		# scope.$watch 'slotData', (newValue)-> 
		# 	console.log 'From Watch'
		# 	console.log newValue
		# 	scope.timeData = _.sortBy newValue, 'time'
		# , true
]

