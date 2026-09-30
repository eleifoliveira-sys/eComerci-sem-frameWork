<?php

require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$productId = (int) ($_GET['id'] ?? 0);
$stmt = db()->prepare(
	'SELECT p.*, c.name AS category '
	. 'FROM products p '
	. 'JOIN categories c ON c.id = p.category_id '
	. 'WHERE p.id = ? AND p.active = 1'
);
$stmt->execute([$productId]);
$product = $stmt->fetch();

if (!$product) {
	http_response_code(404);
	echo json_encode(['error' => 'Produto não encontrado']);
	exit;
}

echo json_encode($product);
