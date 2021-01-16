<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// database connection will be here
// include database and object files
//include_once './database.php';
include_once("database.php");
//include_once './areaClass.php';
include_once("areaClass.php");
  
// instantiate database and area object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$areaClass = new Area($db);
  
// read area will be here
// query area
$stmt = $areaClass->read();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
  
    // area array
    $AREA_arr = array();
    $AREA_arr["records"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $AREA_details=array(
            "areaID" => $areaID,
            "areaName" => $areaName  
        );
  
        array_push($AREA_arr["records"], $AREA_details);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show area data in json format
    echo json_encode($AREA_arr);
}
  
// no area found will be here
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no area found
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>
