<?php
include_once("database.php");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db_connection = new Database();
$conn = $db_connection->dbConnection();

//class User
//{
//    public $conn;
//    private $db;

//    function __construct()
//    {
        //$this->conn = $db;
//        $database = new Database();
//        $db = $database->getConnection();
        //$this->conn=$this->db->get_Connection();
//    }
    
    public function does_user_exist($email,$password){
        $query = "SELECT * FROM USER WHERE email='$email' && password='$password'";
        $result=mysqli_query($this->connection,$query);
        if(mysqli_num_rows($result)>0){
            $row= mysqli_fetch_array($result);
            $data = array(); 
            array_push($data,array( "user_id"=>$row['user_id'],
            "name"=>$row['name'],
            "email"=>$row['email'],
            "address"=>$row['address'],
            "areaID"=>$row['areaID'],
            "notes"=>$row['notes'],
            "password"=>$row['password'], ) );

            $json['status']=200;
            $json['message']='Login Successful';
            $json['detail']=$data;
            
            echo json_encode($json);
            
            mysqli_close($this->connection);
        }
        
        else { 
            $json['status']=400;
            $json['message']='Wrong email or password';
            echo json_encode($json);
            mysqli_close($this->connection);
        }
    }
}

$user = new User();
if(isset($_POST['email'],$_POST['password']))
{
    $email=$_POST['email'];
    $password=$_POST['password'];
    if (!empty($email) && !empty($password)) {
        $encrypted_password=md5($password);
        $user-> does_user_exist($mail,$encrypted_password);
    }
    else {
        $json['status']=100;
        $json['message']='You must fill both fields';
        echo json_encode($json);
    }
}
?>
