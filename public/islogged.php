<?php
session_start();
if(isset($_SESSION["user"])) {
    echo `
    {
        "user": `.$_SESSION["user"].`
    }
    `;
}
?>