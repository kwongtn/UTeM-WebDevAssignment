<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$name = mysqli_real_escape_string($mysqli, trim($request->name));
$pwd = mysqli_real_escape_string($mysqli, trim($request->pwd));
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$city = mysqli_real_escape_string($mysqli, trim($request->city));
$postCode = mysqli_real_escape_string($mysqli, trim($request->postalCode));
$countryID = mysqli_real_escape_string($mysqli, trim($request->countryID));
$roleID = mysqli_real_escape_string($mysqli, trim($request->roleID));
$notes = mysqli_real_escape_string($mysqli, trim($request->notes));
$sql = "INSERT INTO users(name,password,email) VALUES ('$name','$pwd','$email','$city','$postCode','$countryID','$roleID','$notes')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'name' => $name,
'pwd' => $pwd,
'email' => $email,
'postalCode' => $postCode,
'countryID' => $countryID,
'roleID' => $roleID,
'notes' => $notes,
'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}

?>