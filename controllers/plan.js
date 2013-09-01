app.controller('plan', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="Plan Your Ride!";
	$scope.data ={};
	
	//if there are no plans already set create an empty array
	if(sharedData.getPlans().length==0){
		$scope.plannedRides = new Array; 
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

	var initMap = function(name,index){
		// set up the map
		map = new L.Map(name+"-route-"+index);

		// create the tile layer with correct attribution
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © OpenStreetMap contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 9, maxZoom: 20, attribution: osmAttrib});		

		// start the map at Cheif Lunes Meet Spot
		map.setView(new L.LatLng(34.033235,-118.2835057),10);
		map.addLayer(osm);
		return map;
	};
		
	var drawRoute = function(route,map){
		var data=[]; 
		for (i=1;i<route.length-1;i++){
			data.push([route[i][0], route[i][1]]);
			//console.log(route[i][0]);
		}
		var polyline_options = {
			color: '#000',
			"weight": 7,
			"opacity": 0.40
		};
		var track = L.polyline(data, polyline_options).addTo(map);
		// zoom the map to the route
		map.fitBounds(track.getBounds());
	};
	
	$scope.updateRouteMap = function(routeName,index){
		//remove the map if it is already there
		/*
		id = routeName+"-route-"+index; 
		elm = document.getElementById(id);
		elm.parentNode.removeChild(elm);
		*/
		$scope.$apply();
		//create the map
		m = initMap(routeName,index);
		//get all the routes
		routes = sharedData.getRoutes();
			//iterrate through every property in the routes
			for(var propt in routes){
				//get the first array in each rotute, which is the info object
				r = routes[propt][0]; 
				//if the name of that route matches the route name, then draw that route.
				if(r.name==routeName){
					drawRoute(routes[propt],m);
				};
			}
		
		//drawRoute(Null,m);
	}
});
