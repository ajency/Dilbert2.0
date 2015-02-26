#Dilbert

angular.module "dilbert", ["ionic" 
	,"dilbert.login", "dilbert.home"]


.run ['$ionicPlatform', '$rootScope', '$ionicPopup', ($ionicPlatform, $rootScope, $ionicPopup)->


	$ionicPlatform.ready ->
		if window.cordova and window.cordova.plugins.Keyboard
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

		StatusBar.styleDefault()  if window.StatusBar

		if window.connection
			if navigator.connection.type is Connection.NONE
				$ionicPopup.confirm (
						title: "Internet Disconnected"
						content: "Please connect to the internet and try again"
					)
				.then (result)->
						if !result
							ionic.Platform.exitApp
					
			else 
				console.log "Internet Connected"
]


.config ($stateProvider, $urlRouterProvider) ->

	$stateProvider

		#Root abstract state
		.state 'main',
			url: '/main'
			abstract: true
			templateUrl: 'views/main.html'
	

	
	# if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise "/login"
