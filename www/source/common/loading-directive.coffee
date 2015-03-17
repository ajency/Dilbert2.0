angular.module 'dilbert.common', []

.directive 'commonLoader',['$rootScope','$parse', '$compile' ,'$ionicLoading',($rootScope,$parse , $compile, $ionicLoading)->