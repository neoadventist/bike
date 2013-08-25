<?PHP

$file = $_FILES["ride"];

$u = "Upload: " . $_FILES["ride"]["name"] . "<br>";
$t = "Type: " . $_FILES["ride"]["type"] . "<br>";
$s = "Size: " . ($_FILES["ride"]["size"] / 1024) . " kB<br>";


echo json_encode($u.$t.$s);
?>