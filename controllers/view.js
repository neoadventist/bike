app.controller('view', function ($scope, $timeout, $filter,sharedData) {
	$scope.header="View Your Rides!";
	$scope.name = sharedData.getName().name;
	$scope.numRoutes =0;
	
	//all routes are going to go into this layer eventurally. 
	var rLayers = {};
	var polylines = [];
	var dates = [];
	
	initMap = function(){
	// set up the map
	window.map = new L.Map('map');

	// create the tile layer with correct attribution
	//var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmUrl='http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/{z}/{x}/{y}.png';

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
	
	//get size of an object
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	//use great circle calculation to find the distance between two GPS coordinates
	var gpsDistance = function(lat1,lon1,lat2,lon2){
	
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		}
	
		var R = 6371; // km
		var dLat = (lat2-lat1).toRad();
		var dLon = (lon2-lon1).toRad();
		var lat1 = lat1.toRad();
		var lat2 = lat2.toRad();

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		return d;
	}

	var buildRoutes = function(){
		//get raw route data from factory
		$scope.routes = sharedData.getRoutes();
		var size = Object.size($scope.routes);
		$scope.numRoutes = size;
		
		//draw each route from data. 
		for (r=0;r<size;r++){
			drawRoute($scope.routes[r]);
		}
		//add each route to the map
		for (p=0;p<polylines.length;p++){
			window.map.addLayer(polylines[p]);
			rLayers["Route "+dates[p]]=polylines[p];
			console.log(dates[p]);
		}
		//save process layers for later use. 
		sharedData.saveLayers(rLayers);
		
		//build control box. 
		L.control.layers(null, rLayers).addTo(window.map);
	}

	var drawRoute = function(route){
		var data=[]; 
		var prohibited=[33.940497, -118.323422];
		for (i=1;i<route.length-1;i++){
			if (gpsDistance(route[i][0], route[i][1],prohibited[0],prohibited[1])>0.3){
				data.push([route[i][0], route[i][1], route[i][2]]);
			}
		}
		
		//calcuate distance between first and last point. 
		l = data.length-1;
		var distance = gpsDistance(data[1][0],data[1][1],data[l][0],data[l][1]);
		
		//assign a color based on the distance
		if (distance<5){dcolor = '#000000';}
		if (distance>=5 && distance<10){dcolor = '#0000FF';}
		if (distance>=10 && distance<15){dcolor = '#FF00FF';}
		if (distance>=15 && distance<30){dcolor = '#FF0000';}
		if (distance>=30){dcolor = '#660099';}
		
		var polyline_options = {
			color: dcolor,
			"weight": 7,
			"opacity": 0.50
		};
		
		//add the route to the map
		var track = L.polyline(data, polyline_options);
		//track.addTo(window.map);
		polylines.push(track); 
		
		//render a date 		
		for(dateTest=1;dateTest<route.length;dateTest++){
			console.log(dateTest);
			routeDate = new Date(route[dateTest][2]);
			if (!isNaN(routeDate)){ //if the date is valid, then use that date
				dates.push(routeDate);
				break;
			}
		}

		
		//add a marker showing the start of the route. 
		var start = L.marker([data[1][0],data[1][1]], {title: "Start"}).addTo(window.map).bindPopup("This Route has a distance of "+distance+"KM."+" It was started on"+routeDate);
		var end = L.marker([data[l][0],data[l][1]], {title: "End"}).addTo(window.map);
		
		// zoom the map to the route
		//window.map.fitBounds(track.getBounds());
	};
	
	initMap();
	buildRoutes();
});
