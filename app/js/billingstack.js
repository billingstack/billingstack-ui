'use strict';

var billingstack = angular.module('billingstack', ['ngResource'])
	.run(['$rootScope', '$http', '$location', '$routeParams', 'config', function ($rootScope, $http, $location, $routeParams, config) {

		$rootScope.layout = 'default';

		$rootScope.$on('$routeChangeStart', function (actual, next) {
			if (next.layout !== actual.layout) {
				$rootScope.layout = next.layout;
			}
		});

		$rootScope.logout = function () {
			sessionStorage.setItem('billingstack.session', '{}');
			delete config.merchant;
			$location.path('/');
		};
		$rootScope.ifPath = function (starts) {
			var str = $location.path();
			if (starts === '') { return true; }
			if (str == null || starts == null) { return false; }
			str = String(str);
            starts = String(starts);
			return str.length >= starts.length && str.slice(0, starts.length) === starts;
		};

		$rootScope.config = config;

		$rootScope.params = $routeParams;

		var sessionJson = sessionStorage.getItem('billingstack.session');

		if (!sessionJson) {
			sessionJson = '{}';
			sessionStorage.setItem('billingstack.session', sessionJson);
		}
		var session = JSON.parse(sessionJson)
		if (session.merchant) {
			config.merchant = session.merchant;
		} else if ($location.path() !== '/') {
			$location.path('/sign-in');
		}

	}]);