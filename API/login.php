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

$query = "SELECT userID FROM webdb.USER WHERE email='$data->email' AND password='$data->password'";
$result = $db->query( $query );

if ($result->rowCount()>0){
    while( $row = $result->fetch( PDO::FETCH_ASSOC ) ){
        $sessionID = hash('sha256', generateRandomString());
        $loginStatus = True;

        $response = ( object )array();
        $response->sessionID = $sessionID;
        $response->loginStatus = True;

        echo json_encode( $response );

        $userID =  $row['userID'];

        $sql = "INSERT INTO webdb.SESSION (sessionID, userID) VALUES ('$sessionID', '$userID')";
        $sql_result = $db->query( $sql );
    }
}else{
    $response = ( object )array();
    $response->loginStatus = False;

    echo json_encode( $response );
}
$db = null;
?>

