<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$name = mysqli_real_escape_string($mysqli, trim($request->name));
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$address = mysqli_real_escape_string($mysqli, trim($request->address));
$areaID = mysqli_real_escape_string($mysqli, trim($request->areaID));
$notes = mysqli_real_escape_string($mysqli, trim($request->notes));
$password = mysqli_real_escape_string($mysqli, trim($request->password));
$sql = "INSERT INTO USER (name,email,notes,areaID,password) VALUES ('$name','$email','$address','$areaID','$notes','$password')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'name' => $name,
'email' => $email,
'address' => $address,
'areaID' => $areaID,
'notes' => $notes,
'password' => $password,
'userID' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}

?>
