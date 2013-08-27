var app = angular.module('BIKE', ['ui.bootstrap','ngUpload']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/start', {templateUrl: 'views/start.html',   controller: 'start'}).
	  when('/plan', {templateUrl: 'views/plan.html',   controller: 'plan'}).
	  when('/upload', {templateUrl: 'views/upload.html',   controller: 'upload'}).
	  when('/view', {templateUrl: 'views/view.html',   controller: 'view'}).
	  otherwise({redirectTo: '/start'});
}]);
app.factory('sharedData',['$http', function($http) {
	var data = {name:"Default Name"};
	var fetch = {};
	//point =[[34.051144,-118.238113]];
	var routes ={};
	getInfo= function(){
		$http({
			url: "data/get.php",
			method: "POST",
			data: fetch
		}).success(function(DATA, status, headers, config) {
			data = DATA;
			return data;
		}).error(function(DATA, status, headers, config) {
			//$scope.status = status;
		});
	}
	//data = getInfo();
	//console.log(data);
	var userdata = {};
    return {
        getName: function() {
            return data;
        },
		setName: function(name){
			data.name=name;
		},
		saveRoutes: function(r) {
			angular.extend(routes, r);
            //routes = r;
			console.log(routes);
        },
        getRoutes: function() {
            return routes;
        }
    };
}]);
