<?php
error_reporting ( 0 );
// required headers
//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
//include_once './database.php';
include_once( 'database.php' );
//include_once './areaClass.php';
//include_once('areaClass.php');

// instantiate database and area object
$database = new Database();
$db = $database->getConnection();

//session_start();


// Takes raw data from the request
$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json);

// select area array from array table
$query = "SELECT * FROM webdb.AREA ";  
$result = $db->query( $query );

if($result->rowCount()>0)
{
    $results = array();
    while( $row = $result->fetch( PDO::FETCH_ASSOC ) ) {
        

        $AREA_arr = array(
            $areaID=  $row['areaID'],
            $areaName = $row['areaName'] );
        
        array_push($results, $AREA_arr);
            
    
    }
    //set response code - 200 OK
    http_response_code(200);

    //show area data in json format
    echo json_encode($results);
    
}


// no area found will be here
else {

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no area found
    echo json_encode(array("message" => "No area found."));
}
?>
