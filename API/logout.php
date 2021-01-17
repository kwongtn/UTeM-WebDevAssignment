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
$sessionID = $data->sessionID;

$query = "DELETE FROM SESSION WHERE sessionID = '$sessionID'";
$result = $db->query( $query );

$response = (object)array();
$response->logoutStatus = True;

echo json_encode($response);

?>