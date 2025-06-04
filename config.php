<?php
$host = "localhost";      // Of je externe MySQL host
$db   = "fivem";          // Naam van je FiveM-database
$user = "root";           // Gebruikersnaam
$pass = "wachtwoord";     // Wachtwoord

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connectie mislukt: " . $conn->connect_error);
}
?>
