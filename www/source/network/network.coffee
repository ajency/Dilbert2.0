angular.module 'dilbert.network', []

.factory 'NetworkInterceptor' ,['$q', '$cordovaNetwork', '$window'
	, ($q, $cordovaNetwork, $window)->

		isViewUrl = (config)->
			_.contains config.url, '.html'

		isOnline = (config)->
			q = $q.defer()

			if ionic.Platform.isWebView()
				if $cordovaNetwork.isOnline() then q.resolve config
				else q.reject 'ConnectionError'
			else
				if $window.navigator.onLine then q.resolve config
				else q.reject 'ConnectionError'
				

			q.promise


		NetworkInterceptor = 

			request : (config)->
				if isViewUrl(config) then config
				else isOnline config
]

.config ['$httpProvider', ($httpProvider)->  

    $httpProvider.interceptors.push 'NetworkInterceptor'
]