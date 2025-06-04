<?php
session_start();
if (isset($_SESSION['user'])) {
    header("Location: dashboard.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Login met Discord</title>
</head>
<body class="flex items-center justify-center h-screen bg-gray-900 text-white">
  <div class="text-center">
    <h1 class="text-3xl mb-4 font-bold">Refund Systeem</h1>
    <a href="auth.php" class="px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition">Log in met Discord</a>
  </div>
</body>
</html>
