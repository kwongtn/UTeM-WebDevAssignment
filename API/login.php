<?php

// files needed to connect to database
include_once 'database.php';
include_once 'user.php';
//
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->email = $data->email;
$email_exists = $user->emailExists();
 
// check if email exists and if password is correct
if($email_exists && password_verify($data->password, $user->password)){
 
     // generate jwt @ sessionID
    ini_set('sessionID.hash_function', 'sha256');

    $query = "INSERT INTO SESSION WHERE sessionID = '$sessionID'";
    $result = $db->query( $query );
 
    // set response code
    http_response_code(200);

    echo json_encode(array("message" => "Login success."));
 
    
}
 
// login failed
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user login failed
    echo json_encode(array("message" => "Login failed."));
}
?>