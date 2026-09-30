<?php

require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true) ?? [];
$stmt = db()->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$data['email'] ?? '']);
$user = $stmt->fetch();

if (!$user || !password_verify($data['password'] ?? '', $user['password'])) {
	http_response_code(401);
	echo json_encode(['error' => 'Credenciais inválidas']);
	exit;
}

// Protótipo acadêmico: token simples em sessão PHP.
session_start();
$_SESSION['user_id'] = $user['id'];
$_SESSION['role'] = $user['role'];

echo json_encode([
	'message' => 'Login realizado',
	'user' => [
		'id' => $user['id'],
		'name' => $user['name'],
		'email' => $user['email'],
		'role' => $user['role'],
	],
]);
