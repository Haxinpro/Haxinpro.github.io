<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Hae ja suodata tiedot
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    // Määrittele vastaanottajan sähköpostiosoite
    $to = "sinun.sahkoposti@esimerkki.com"; // ← VAIHDA tähän oma osoitteesi!
    $subject = "Contact Form Message from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    // Lähetä sähköposti
    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Message sent successfully!</p>";
    } else {
        echo "<p>Something went wrong. Please try again.</p>";
    }
} else {
    echo "<p>Invalid request.</p>";
}
?>
