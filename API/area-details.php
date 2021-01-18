<?php

error_reporting ( 0 );

include_once( 'database.php' );
$database = new Database();
$db = $database->getConnection();

$json = file_get_contents( 'https://raw.githubusercontent.com/kwongtn/OpenCovidMY/main/data/district/20210116-district.json' );
$data = json_decode( $json, true );

$totalList = ( object )array();

// Area start
$areaList = array();
foreach ( $data as $place ) {
    $individualData = ( object )array();
    $individualData->area = $place['district'];
    $individualData->cases = $place['cases'];

    array_push( $areaList, $individualData );
}

$totalList->areaStats = $areaList;

// To area intent start
$sql = "SELECT areaName, toIntent FROM webdb.AREA a INNER JOIN (SELECT destAreaID, count(destAreaID) as toIntent FROM webdb.HISTORY GROUP BY destAreaID) b ON a.areaID = b.destAreaID";
$result = $db->query( $sql );
$toAreaList = array();

if( $result->rowCount()> 0){
    while( $row = $result->fetch( PDO::FETCH_ASSOC ) ) {
        $response = ( object )array();
        $response->area = $row['areaName'];
        $response->intent = $row['toIntent'];
        array_push( $toAreaList, $response );

    }
}

$totalList->toAreaIntent = $toAreaList;

// FROM area intent start
// To area intent start
$sql = "SELECT areaName, fromIntent FROM webdb.AREA a INNER JOIN (SELECT sourceAreaID, count(sourceAreaID) as fromIntent FROM webdb.HISTORY GROUP BY sourceAreaID) b ON a.areaID = b.sourceAreaID";
$result = $db->query( $sql );
$fromAreaList = array();

if( $result->rowCount()> 0){
    while( $row = $result->fetch( PDO::FETCH_ASSOC ) ) {
        $response = ( object )array();
        $response->area = $row['areaName'];
        $response->intent = $row['fromIntent'];
        array_push( $fromAreaList, $response );

    }
}

$totalList->fromAreaIntent = $fromAreaList;
echo json_encode( $totalList );

?>