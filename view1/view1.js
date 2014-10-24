'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'ViewCtrl'
  });
}]);

//.controller('View1Ctrl', function($scope, List) {
//	$scope.doPost = function() {
//		List.push({
//			assetid:$scope.assetid,
//			location:$scope.location
//		});
//		$scope.assetid = "";
//		$scope.location = "";
//	};
//});
