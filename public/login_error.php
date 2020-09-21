<?php
session_start();
header("Content-Type: text/javascript; charset=utf-8");
if(isset($_SESSION["log_error"])) {
    $data = array("error" => $_SESSION["log_error"]);
    echo json_encode($data);
}
?>