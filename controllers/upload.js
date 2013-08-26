app.controller('upload', function ($scope, $timeout, $filter) {
	$scope.header="Upload Your Ride!";
	
	$scope.uploadComplete = function (content, completed) {
		if (completed && content.length > 0) {
			$scope.response = (content); // Presumed content is a json string!
			console.log(content);
			for($currentRoute=0;$currentRoute<$scope.response.length;$currentRoute++){
				drawRoute($scope.response[$currentRoute]);
			}
			
		}
	};
	
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
	
drawRoute = function(route){
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
	
});
