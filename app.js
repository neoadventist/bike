var app = angular.module('BIKE', ['ui.bootstrap','ngUpload']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/start', {templateUrl: 'views/start.html',   controller: 'start'}).
	  when('/plan', {templateUrl: 'views/plan.html',   controller: 'plan'}).
	  when('/upload', {templateUrl: 'views/upload.html',   controller: 'upload'}).
	  when('/view', {templateUrl: 'views/view.html',   controller: 'view'}).
	  otherwise({redirectTo: '/start'});
}]);