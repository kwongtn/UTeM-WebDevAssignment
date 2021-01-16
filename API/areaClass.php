<?php
class Area{
  
    // database connection and table name
    private $conn;
    private $table_name = "AREA";
  
    // object properties
    public $areaID;
    public $areaName;
    
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    function read(){
    
        // select all query
        $query = "SELECT
                    a.name as areaName
                FROM
                    " . $this->table_name . " ";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }
}
?>