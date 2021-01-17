<?php

// files needed to connect to database
include_once ('database.php');

// get database connection
$database = new Database();
$db = $database->getConnection();

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

$query = "SELECT sessionID FROM webdb.SESSION";
$result = $db->query( $query );


if ($result->rowCount()>0){
    
    while( $row = $result->fetch( PDO::FETCH_ASSOC ) ){
        $sessionID = hash('sha256', generateRandomString());
        

        $response = ( object )array();
        $response->sessionID = $sessionID;
        
        //$response->message = "Your message here";

        echo json_encode( $response );
        echo gettext("How can we help u?");
    }
    
}else{
    $response = ( object )array();
    $response->$message = "Sorry please try later";

    echo json_encode( $response );
}
$db = null;
?>

