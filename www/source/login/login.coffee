angular.module('dilbert.login',[])

.controller('LoginController',['$scope','$state','$window',($scope,$state,$window) ->
	$scope.login = ->
		#login code goes here
		$state.go 'home'

])


.config ['$stateProvider', ($stateProvider)->

	$stateProvider

		.state "login",
			url: "/login"
			templateUrl: "views/login.html"
			controller: "LoginController"
]