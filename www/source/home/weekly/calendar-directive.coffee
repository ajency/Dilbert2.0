angular.module 'dilbert.home'

.directive 'customCalendar', ['$rootScope', '$parse', '$compile' ,'$ionicPopup', '$timeout'
	,($rootScope, $parse , $compile, $ionicPopup, $timeout)->
	
		restrict:'E'
		template:'<div><div class="myCalendar" id="myCalendar"></div></div>'
		replace: true
		scope:
			display: '='
			changeDate: '&onMonday'
		
		link: (scope, elem, attrs)->

			scope.$watch 'display', (value)->
				
				if value
					$timeout ->

						$ "#myCalendar" 
							.ionCalendar
								lang: "en"
								years: "100"
								format: "DD.MM.YYYY,ddd"
								sundayFirst: false
								onClick:(date)->
									if date.indexOf('Mon') >= 0
										# console.log date+' is a monday'
										value = moment(date,'DD.MM.YYYY,ddd').format('DD-MM-YYYY')
										# scope.setup(value)
										scope.changeDate({value: value});
										
]