<?php
error_reporting ( 0 );

include_once( 'database.php' );
$database = new Database();
$db = $database->getConnection();

session_start();

$errors = array();

// Takes raw data from the request
$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json);

$query = "INSERT INTO webdb.USER (name, email, notes, areaID, password, address) 
VALUES('$data->name', '$data->email', '$data->notes',(SELECT areaID FROM AREA WHERE areaName='$data->area'), '$data->password', '$data->address')";
$result = $db->query( $query );

$response = ( object )array();
$response->status = True;
$response->message = 'success';

echo json_encode($response);
?>