<?php

require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$query = trim($_GET['q'] ?? '');
$categoryId = (int) ($_GET['category_id'] ?? 0);
$sql = 'SELECT p.*, c.name AS category '
	. 'FROM products p '
	. 'JOIN categories c ON c.id = p.category_id '
	. 'WHERE p.active = 1';
$params = [];

if ($query !== '') {
	$sql .= ' AND p.name LIKE ?';
	$params[] = "%$query%";
}

if ($categoryId) {
	$sql .= ' AND p.category_id = ?';
	$params[] = $categoryId;
}

$sql .= ' ORDER BY p.created_at DESC';
$stmt = db()->prepare($sql);
$stmt->execute($params);

echo json_encode($stmt->fetchAll());

