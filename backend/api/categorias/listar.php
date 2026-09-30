<?php

require_once __DIR__ . '/../../config/database.php';

header('Content-Type: application/json; charset=utf-8');

$categories = db()->query('SELECT * FROM categories ORDER BY name')->fetchAll();
echo json_encode($categories);
