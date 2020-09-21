<?php
session_start(); 


if(!isset($_POST["email"]) || !isset($_POST["pass"])) header("location:/#/register");

$conn = new mysqli("localhost", "root", "", "code");
if ($conn->connect_error) {
    header("location:/#/register");
    die();
}
if($conn->query("select id from users where email='".$_POST['email']."'")->num_rows > 0) {
    $_SESSION["reg_error"]="Użytkownik już istnieje";
    $conn->close();
    header("location:/#/register");
    die();
}


$res = $conn->query("insert into users (email, pass) values ('".$_POST['email']."','".$_POST["pass"]."')");
$conn->close();
unset($_SESSION["reg_error"]);
header("location:/#/login");
?>