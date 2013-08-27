app.controller('view', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="View Your Rides!";
	$scope.name = sharedData.getRoutes().name;
	
	initMap = function(){
	// set up the map
	window.map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 9, maxZoom: 20, attribution: osmAttrib});		

	// start the map at Cheif Lunes Meet Spot
	map.setView(new L.LatLng(34.033235,-118.2835057),10);
	map.addLayer(osm);
	};
	initMap();
	
	
	$scope.setRoute = function(name){
		console.log(name);
		sharedData.setRoutes(name);
	}
});
