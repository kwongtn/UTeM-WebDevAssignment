<?php

error_reporting ( 0 );

include_once( 'database.php' );
$database = new Database();
$db = $database->getConnection();

// Inintialize URL to the variable
$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

// Use parse_url() function to parse the URL
// and return an associative array which
// contains its various components
$link_components = parse_url( $actual_link );

// Use parse_str() function to parse the
// string passed via URL
parse_str( $link_components['query'], $params );

//CHECK sessionID in db or not
$sessionID = $params['sessionID'];

$sql = "SELECT * FROM webdb.SESSION WHERE sessionID='$sessionID'";
$result = $db->query( $sql );
$loginStatus = false;

if ( $result->rowCount() > 0 ) {
    // output data of each row
    while( $row = $result->fetch( PDO::FETCH_ASSOC ) ) {
        $loginStatus = true;
        if ( $loginStatus = true ) {
            //SELECT userID from SESSION TABLE
            $getsql = "SELECT userID FROM webdb.SESSION WHERE sessionID='$sessionID'";
            $get_result = $db->query( $getsql );
            //ROW
            if ( $get_result->rowCount() > 0 ) {
                while( $row_user = $get_result->fetch( PDO::FETCH_ASSOC ) ) {
                    //get userID
                    $userID = $row_user['userID'];
                    $get_sql_details = "SELECT userID, name, email, notes, areaName FROM webdb.USER a LEFT JOIN webdb.AREA b ON a.areaID=b.areaID WHERE userID='$userID'";
                    $get_result_details = $db->query( $get_sql_details );
                    //ROW
                    if ( $get_result_details->rowCount() > 0 ) {
                        while( $row_user_details = $get_result_details->fetch( PDO::FETCH_ASSOC ) ) {
                            $response = ( object )array();
                            $response->userID = $row_user_details['userID'];
                            $response->email = $row_user_details['email'];
                            $response->notes = $row_user_details['notes'];
                            $response->area = $row_user_details['area'];

                            echo json_encode( $response );

                        }
                    }
                }
            }
        }
    }
} else {
    echo '0 results';
}
$db = null;

?>