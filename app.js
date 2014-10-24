'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.view1',
	'myApp.view2',
	'myApp.version'
]).
	
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/view1'});
}]).

factory('List', function($q, $http) {
	function push(msg) {
		var deferred = $q.defer();

		$http.post('//server.kscmasonlibrary.org:8080/', msg).
			success(function(data, status) {
				console.log(status, data);
				deferred.resolve(data);
			}).
			error(function(data, status) {
				console.log(status, data);
				deferred.reject(data);
			});

		return deferred.promise;
	}
	function get() {
		var deferred = $q.defer();

		$http.get('//server.kscmasonlibrary.org:8080/', {cache:true}).
			success(function(data, status) {
				console.log(status, data);
				deferred.resolve(data);
			}).
			error(function(data, status) {
				console.log(status, data);
				deferred.reject(data);
			});
			
		return deferred.promise;
	}
	return {
		push: push,
		get: get
	};
}).

controller('ViewCtrl', function($scope, List) {
	$scope.rows = [{}];
	
	List.get().then(function(data) {
		$scope.rows = data;
	});

	$scope.doPost = function() {
		var obj = {
			assetid:$scope.assetid,
			location:$scope.location
		};
		List.push(obj);
		console.log($scope.rows);
		$scope.rows.push(obj);
		console.log($scope.rows);
		$scope.assetid = "";
		$scope.location = "";
	};
});
