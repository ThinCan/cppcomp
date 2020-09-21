<?php
session_start();
header("Content-Type: text/javascript; charset=utf-8");
if(isset($_SESSION["reg_error"])) {
    $data = array("error" => $_SESSION["reg_error"]);
    echo json_encode($data);
}
?>