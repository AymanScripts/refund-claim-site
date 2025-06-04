<?php
session_start();
require 'config.php';

if (!isset($_GET['code'])) {
    header("Location: https://discord.com/api/oauth2/authorize?client_id=$discord_client_id&redirect_uri=" . urlencode($redirect_uri) . "&response_type=code&scope=identify%20guilds.members.read");
    exit;
}

$code = $_GET['code'];

// Exchange code
$tokenRequest = curl_init();
curl_setopt_array($tokenRequest, [
    CURLOPT_URL => "https://discord.com/api/oauth2/token",
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    CURLOPT_POSTFIELDS => http_build_query([
        "client_id" => $discord_client_id,
        "client_secret" => $discord_client_secret,
        "grant_type" => "authorization_code",
        "code" => $code,
        "redirect_uri" => $redirect_uri,
        "scope" => "identify guilds.members.read"
    ])
]);
$response = json_decode(curl_exec($tokenRequest), true);
curl_close($tokenRequest);

$access_token = $response['access_token'] ?? null;
if (!$access_token) die("Fout bij token ophalen.");

// Get user
$userRequest = curl_init();
curl_setopt_array($userRequest, [
    CURLOPT_URL => "https://discord.com/api/users/@me",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ["Authorization: Bearer $access_token"]
]);
$user = json_decode(curl_exec($userRequest), true);
curl_close($userRequest);

// Get guild membership
$guildRequest = curl_init();
curl_setopt_array($guildRequest, [
    CURLOPT_URL => "https://discord.com/api/users/@me/guilds/$guild_id/member",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ["Authorization: Bearer $access_token"]
]);
$guildMember = json_decode(curl_exec($guildRequest), true);
curl_close($guildRequest);

// Rolcheck
if (!in_array($required_role_id, $guildMember['roles'] ?? [])) {
    die("⛔ Je hebt geen toegang. Vereiste rol ontbreekt.");
}

$_SESSION['user'] = $user;
header('Location: dashboard.php');
exit;
