app.controller('upload', function ($scope, $timeout, $filter) {
	$scope.header="Upload Your Ride!";
	
	$scope.uploadComplete = function (content, completed) {
		if (completed && content.length > 0) {
			$scope.response = (content); // Presumed content is a json string!
			console.log(content);
		}
	};
	

	// set up the map
	map = new L.Map('map');
	
	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 10, maxZoom: 20, attribution: osmAttrib});		

	// start the map at Cheif Lunes Meet Spot
	map.setView(new L.LatLng(34.033235,-118.2835057),10);
	map.addLayer(osm);
	
	var myLines = [{
		"type": "LineString",
		"coordinates": [[-100, 40], [-105, 45], [-110, 55]]
	}, {
		"type": "LineString",
		"coordinates": [[-105, 40], [-110, 45], [-115, 55]]
	}];

	var myStyle = {
		"color": "#ff7800",
		"weight": 5,
		"opacity": 0.65
	};

	L.geoJson(myLines, {
		style: myStyle
	}).addTo(map);	
	
});
