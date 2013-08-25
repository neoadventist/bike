<?PHP


$file = $_FILES['ride']['tmp_name'];

$contents = file_get_contents($file);
$xml =simplexml_load_file($file);
$u = "Upload: " . $_FILES["ride"]["name"] . "<br>";
$t = "Type: " . $_FILES["ride"]["type"] . "<br>";
$s = "Size: " . ($_FILES["ride"]["size"] / 1024) . " kB<br>";


echo json_encode($u.$t.$s.$file.print_r($xml));
?>