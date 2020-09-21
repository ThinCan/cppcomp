<?php
session_start();
if(!isset($_SESSION["user"])) die();

$c = new mysqli("localhost", "root","","code");
$userid = $_SESSION["user"];
$res = $c->query("select id,code from drafts where userid=$userid");

$codes = [];

while($item = $res->fetch_assoc()) {
    $codes[] = array($item["id"],$item["code"]);
}
echo json_encode($codes);
?>