angular.module 'dilbert.home'

.directive 'customCalendar', ['$rootScope','$parse', '$compile' ,'$ionicPopup',($rootScope,$parse , $compile,$ionicPopup)->
	
	restrict:'E'
	template:'<div><div class="myCalendar" id="myCalendar"></div><div>{{dateInfo}}</div></div>'
	replace: true
	link: (scope, elem, attrs)->
		$ "#myCalendar" 
		.ionCalendar(
			lang: "en"
			years: "100"
			format: "DD.MM.YYYY,ddd"
			sundayFirst: false
			onClick:(date)->
				if date.indexOf('Mon') >= 0
					console.log date+' is a monday'			
	);
]