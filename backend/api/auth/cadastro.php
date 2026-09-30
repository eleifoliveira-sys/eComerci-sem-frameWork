<?php

require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true) ?? [];

if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
	http_response_code(422);
	echo json_encode(['error' => 'Nome, e-mail e senha são obrigatórios']);
	exit;
}

$stmt = db()->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$data['email']]);

if ($stmt->fetch()) {
	http_response_code(409);
	echo json_encode(['error' => 'E-mail já cadastrado']);
	exit;
}

$stmt = db()->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
$stmt->execute([
	$data['name'],
	$data['email'],
	password_hash($data['password'], PASSWORD_DEFAULT),
]);

echo json_encode(['message' => 'Cadastro realizado com sucesso']);
