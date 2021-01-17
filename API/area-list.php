<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
//include_once './database.php';
include_once('database.php');

// instantiate database and object
$database = new Database();
$db = $database->getConnection();
$num=array();

if (count($num) > 0) {
       
    // select area array from array table
    $query = "SELECT * FROM webdb.AREA";  
    $result = $db->query($query);

    // set response code - 200 OK
    http_response_code(200);

    // show area data in json format
    echo json_encode($result);
}

// no area found will be here
else {

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no area found
    echo json_encode(
        array("message" => "No area found.")
    );
}
?>
