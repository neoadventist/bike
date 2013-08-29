app.controller('plan', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="Plan Your Ride!";
	$scope.data ={};
	$scope.plannedRides = new Array; 
	$scope.newRide = function(){
		$scope.plannedRides.push({});
	}
	
	//Get Layes from view
	layers = sharedData.getLayers(); 
	
	$scope.routenames = []; 
	nameCount =0;
	for (name in layers){
		$scope.routenames[nameCount]=name;
		nameCount++;
	}
	console.log($scope.routenames); 
	
	//get size of an object
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
});
