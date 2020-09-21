<?php
session_start();
require "mailer/PHPMailer.php";
require 'mailer/SMTP.php';
require 'mailer/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = '';                     // SMTP username
    $mail->Password   = '';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;

    $mail->setFrom('', 'Code Editor');
    $mail->addAddress($_SESSION["email"], 'Client');     // Add a recipient
    $mail->CharSet="UTF-8";

    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Twój kod napisany w Kompilatorze C++!';
    $mail->Body    = str_replace("\n", "<br>",$_POST["code"]);

    $mail->send();
} catch(Exception $e) {
    echo $mail->ErrorInfo;
}
?>
