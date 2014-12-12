'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute']).
	
config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/view1', { templateUrl: 'view1/view1.html', controller: ViewController })
		.when('/view2', { templateUrl: 'view2/view2.html', controller: ViewController })
		.otherwise({redirectTo: '/view1'});
}]).

factory('List', function($q, $http) {

	var factory = {};
//	var rows = [{}];

	factory.get = function() {
		var deferred = $q.defer();

		$http.get('//server.kscmasonlibrary.org:8080/', {cache:true}).
			success(function(data, status) {
//				console.log(status, data);
//				factory.rows = data;
				deferred.resolve(data);
			}).
			error(function(data, status) {
				console.log(status, data);
				deferred.reject(data);
			});
			
		return deferred.promise;
	};

	factory.post = function(msg) {
		var deferred = $q.defer();

		$http.post('//server.kscmasonlibrary.org:8080/', msg).
			success(function(data, status) {
				console.log(status, data);
				factory.rows = data;
				deferred.resolve(data);
			}).
			error(function(data, status) {
				console.log(status, data);
				deferred.reject(data);
			});

		return deferred.promise;
	};

	return factory;

});

function ViewController($scope, List) {
	List.get().then(function(data) {
		List.rows = data;
		$scope.rows = List.rows;
	});
	
	$scope.doPost = function() {
		var obj = {
			assetid:   $scope.assetid,
			location:  $scope.location
		};
		List.post(obj).then(function(data) { $scope.rows = data; });
		$scope.assetid = "";
		$scope.location = "";
	};
}
