<?PHP


$file = $_FILES['ride']['tmp_name'];

$n = count($file);
$routes = Array(); 

for($f=0;$f<$n;$f++){
	$xml =simplexml_load_file($file[$f]);
	/*
	$u = "Upload: " . $_FILES["ride"]["name"] . "<br>";
	$t = "Type: " . $_FILES["ride"]["type"] . "<br>";
	$s = "Size: " . ($_FILES["ride"]["size"] / 1024) . " kB<br>";
	*/
	$res =$xml->trk->name;

	$route = Array(); 
	$properties = Array(); 
	$properties["name"]="Spencer";
	$properties["creator"]="http://spencersims.com";
	$properties["routeNumber"]=$f;
	$route[0]=$properties;
	$i=1;
	foreach($xml->trk->trkseg->trkpt as $point){
		$route[$i][0]= (float)$point[0]["lat"];
		$route[$i][1]= (float)$point[0]["lon"];
		$route[$i][2]= (string)$point[0]->time;
		$route[$i][3]= (int)$point[0]->ele;
		$i++;
	}
	
	$routes[$f]= $route;

}
echo json_encode($routes);
?>