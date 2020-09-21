<?php
if(!isset($_POST["email"]) || !isset($_POST["pass"])) header("location:/#/login");
session_start();

$c = new mysqli("localhost", "root", "", "code");
if ($c->connect_error) {
    header("location:/#/login");
    die();
}

$res = $c->query("select id, email from users where email='".$_POST["email"]."' and pass='".$_POST["pass"]."'");
if($res->num_rows == 0) {
    $_SESSION["log_error"] = "Błędny email lub hasło";
    $c->close();
    header("location:/#/login");
    die();
} else {
    while($row = $res->fetch_assoc()) {
        $_SESSION["user"] = $row["id"];
        $_SESSION["email"] = $row["email"];
        break;
    }
}
unset($_SESSION["log_error"]);
$c->close();
header("location:/#/");
?>