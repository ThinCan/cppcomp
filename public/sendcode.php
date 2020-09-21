<?php
session_start();
if(!isset($_SESSION["user"])) {
    die();
} else {
    $c = new mysqli("localhost", "root", "", "code");
    if($c->connection_error) die();
    $c->query("insert into drafts (userid, code) values ('".$_SESSION["user"]."', '".$_POST["code"]."')");
    $c->close();
}
?>