#Dilbert
angular.module "dilbert", ["ionic", "ngCordova"
	,"dilbert.network", "dilbert.common", "dilbert.login", "dilbert.home"]


.run ['$ionicPlatform', '$rootScope', '$ionicPopup'
	, ($ionicPlatform, $rootScope, $ionicPopup)->

		#Initialize $rootScope variables
		$rootScope.slotData = []

		$ionicPlatform.ready ->
			if window.cordova and window.cordova.plugins.Keyboard
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

			StatusBar.styleDefault()  if window.StatusBar

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
