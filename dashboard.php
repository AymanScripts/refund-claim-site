<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Refund Dashboard</title>
</head>
<body class="bg-gray-100 text-gray-900">
  <div class="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Voeg Refund Toe</h2>
      <a href="logout.php" class="text-red-500 hover:underline">Logout</a>
    </div>
    <form action="submit_refund.php" method="POST" class="space-y-4">
      <div>
        <label class="block">Speler Identifier</label>
        <input type="text" name="identifier" required class="w-full border p-2 rounded">
      </div>
      <div>
        <label class="block">Type</label>
        <select name="type" class="w-full border p-2 rounded">
          <option value="cash">Cash</option>
        </select>
      </div>
      <div>
        <label class="block">Waarde</label>
        <input type="number" name="value" required class="w-full border p-2 rounded">
      </div>
      <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Toevoegen
      </button>
    </form>
  </div>
</body>
</html>
