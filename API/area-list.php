<?php

include_once( 'database.php' );
$database = new Database();
$db = $database->getConnection();

$sql = "SELECT * FROM webdb.AREA";
$result = $db->query( $sql );

if( $result->rowCount()>0 ){
    $list = array();
    while( $row = $result->fetch( PDO::FETCH_ASSOC )) {
        $areaID =  $row['areaID'];
        $areaName =  $row['areaName'];

        array_push($list, $areaName);
    }

    echo json_encode($list);
}else {
    echo 'No Database..';
}

?>