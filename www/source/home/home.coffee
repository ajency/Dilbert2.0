angular.module 'dilbert.home', []


.config ['$stateProvider', ($stateProvider)->

	$stateProvider

		.state 'home',
			url: '/home'
			parent: 'main'
			views:
				"mainContent":
					templateUrl: 'views/home.html'

		.state "daily",
			url: "/daily"
			parent: 'home'
			views:
				"dailyContent":
					templateUrl: "views/daily.html"
					controller:"DailyController"
		
		.state "weekly",
			url: "/weekly"
			parent: 'home'
			views:
				"weeklyContent":
					templateUrl: "views/weekly.html"
		
		# .state "coming-soon",
		# 	url:"/coming-soon"
		# 	parent: 'home'
]