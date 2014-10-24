'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'ViewCtrl'
  });
}]);

//.controller('View2Ctrl', function($scope, List) {
//	$scope.rows = [{}];
//	List.get().then(function(data) {
//		$scope.rows = data;
//	});
//});
