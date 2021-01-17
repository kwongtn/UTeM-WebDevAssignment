<?php
class Database{
  
    
    private $db_host = "48mh42.ddns.net:51703";
    private $db_name = "webdb";
    private $db_username = "root";
    private $db_password = "tnwebdev123";
    public $conn;
  
    // get the database connection
    public function getConnection(){
  
        try{
            $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_username,$this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }
        catch(PDOException $e){
            echo "Connection error ".$e->getMessage(); 
            exit;
        }
    }
}
?>