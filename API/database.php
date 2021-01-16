<?php
class Database{
  
    
    private $host = "48mh42.ddns.net:51703";
    private $db_name = "webdb";
    private $username = "root";
    private $password = "tnwebdev123";
    public $conn;
  
    // get the database connection
    public function getConnection(){
  
        try{
            $conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
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
