<?php
include 'config.php';

$identifier = $_POST['identifier'] ?? '';
$type = $_POST['type'] ?? '';
$value = intval($_POST['value'] ?? 0);

if ($identifier && $type && $value > 0) {
    $stmt = $conn->prepare("INSERT INTO refunds (identifier, type, value) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $identifier, $type, $value);
    $stmt->execute();
    echo "✅ Refund toegevoegd!";
} else {
    echo "❌ Ongeldige invoer.";
}
$conn->close();
?>
