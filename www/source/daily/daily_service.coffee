angular.module('daily.service',[])
.service 'DailyService',['$http','$scope',($http,$scope)->
	$scope.data =[
		starttime:1422523800
		timeLogs=[
			{
				task:'Dilbert Mobile - Object Defination'
				status:'available'
				endtime:1422526800
			}
			{
				task:'Dilbert Mobile - Object Defination'
				status:'available'
				endtime:1422528000
			}			
		]

	]
	@.getDailyData=()->


]