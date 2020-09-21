<?php
if(!isset($_POST["id"])) {header("location:/#/codelist"); die();}

$conn = new mysqli("localhost", "root", "", "code");
$conn->query("DELETE FROM drafts WHERE id=".$_POST["id"]);
$conn->close();

$arr = array("success" => "true");
echo json_encode($arr);
?>