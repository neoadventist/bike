app.controller('view', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="View Your Rides!";
	$scope.name = sharedData.getName().name;
	initMap = function(){
	// set up the map
	window.map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 9, maxZoom: 20, attribution: osmAttrib});		

	// start the map at Cheif Lunes Meet Spot
	window.map.setView(new L.LatLng(34.033235,-118.2835057),10);
	window.map.addLayer(osm);
	};
	
	$scope.setName = function(name){
		console.log(name);
		sharedData.setName(name);
	}
	
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	// Get the size of an object
	//var size = Object.size(myArray);	
	
	var buildRoutes = function(){
		$scope.routes = sharedData.getRoutes();
		var size = Object.size($scope.routes);
		for (r=0;r<size;r++){

		drawRoute($scope.routes[r]);

		}
	}

	var drawRoute = function(route){
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
		var track = L.polyline(data, polyline_options).addTo(window.map);
		// zoom the map to the route
		//window.map.fitBounds(track.getBounds());
	};
	
	initMap();
	buildRoutes();
});
