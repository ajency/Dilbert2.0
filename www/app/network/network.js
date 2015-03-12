angular.module('dilbert.network', []).factory('NetworkInterceptor', [
  '$q', '$cordovaNetwork', '$window', function($q, $cordovaNetwork, $window) {
    var NetworkInterceptor, isOnline, isViewUrl;
    isViewUrl = function(config) {
      return _.contains(config.url, '.html');
    };
    isOnline = function(config) {
      var q;
      q = $q.defer();
      if (ionic.Platform.isWebView()) {
        if ($cordovaNetwork.isOnline()) {
          q.resolve(config);
        } else {
          q.reject('ConnectionError');
        }
      } else {
        if ($window.navigator.onLine) {
          q.resolve(config);
        } else {
          q.reject('ConnectionError');
        }
      }
      return q.promise;
    };
    return NetworkInterceptor = {
      request: function(config) {
        if (isViewUrl(config)) {
          return config;
        } else {
          return isOnline(config);
        }
      }
    };
  }
]).config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.interceptors.push('NetworkInterceptor');
  }
]);
