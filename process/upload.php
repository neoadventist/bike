<?PHP


$file = $_FILES['ride']['tmp_name'];

$contents = file_get_contents($file);
$xml =simplexml_load_file($file);
$u = "Upload: " . $_FILES["ride"]["name"] . "<br>";
$t = "Type: " . $_FILES["ride"]["type"] . "<br>";
$s = "Size: " . ($_FILES["ride"]["size"] / 1024) . " kB<br>";

$res =$xml->trk->name;

$route = Array(); 

$i=0;
foreach($xml->trk->trkseg->trkpt as $point){
	$route[$i][0]= (float)$point[0]["lat"];
	$route[$i][1]= (float)$point[0]["lon"];
	$i++;
}
echo json_encode($route);
?>