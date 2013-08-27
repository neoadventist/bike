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
	
	var buildRoutes = function(){
		$scope.routes = sharedData.getRoutes();
		for(c=0;c<$scope.routes.length;c++){
			drawRoute($scope.routes[c]);
		}
	}

	var drawRoute = function(route){
		var data=[]; 
		for (i=0;i<route.length;i++){
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
