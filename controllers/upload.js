app.controller('upload', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="Upload Your Ride!";
	$scope.name = sharedData.getName().name;
	$scope.routeData={};
	$scope.serverRoutes ='';
	$scope.uploadComplete = function (content, completed) {
		if (completed && content.length > 0) {
			//$scope.response = (content); // Presumed content is a json string!
			$scope.serverRoutes =  content; 
			//console.log($scope.response);
			for($currentRoute=0;$currentRoute<$scope.serverRoutes.length;$currentRoute++){
				m = initMap($currentRoute,$scope.serverRoutes[$currentRoute][0]["name"]);
				drawRoute($scope.serverRoutes[$currentRoute],m);
			}
			console.log($scope.routeData);
		}
	};
	
var initMap = function(id,name){
	// set up the map
	$scope.routeData["route"+id] = {};
	$scope.routeData["route"+id]["routeId"]="route"+id;
	$scope.routeData["route"+id]["name"]=name;
	$scope.$apply();
	map = new L.Map($scope.routeData["route"+id].routeId);

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 9, maxZoom: 20, attribution: osmAttrib});		

	// start the map at Cheif Lunes Meet Spot
	map.setView(new L.LatLng(34.033235,-118.2835057),10);
	map.addLayer(osm);
	return map;
};
//initMap(0);
	
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

$scope.saveName = function(map){
	id = map.split("e"); 
	id = id[1]; 
	$scope.serverRoutes[id][0]["name"]=$scope.routeData["route"+id]["name"];	
}	
$scope.save = function(){
	sharedData.saveRoutes($scope.serverRoutes);
}
});
