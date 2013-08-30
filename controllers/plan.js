app.controller('plan', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="Plan Your Ride!";
	$scope.data ={};
	
	//if there are no plans already set
	if(sharedData.getPlans().length==0){
		$scope.plannedRides = new Array; 
		alert("EMPTY");
	}else{
		$scope.plannedRides=sharedData.getPlans();
		console.log($scope.plannedRides);
	}
	
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
	
	//Save Plans 
	$scope.save = function(){
		sharedData.setPlans($scope.plannedRides);
	}
});
