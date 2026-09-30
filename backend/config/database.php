    <?php
declare(strict_types=1);
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . ($_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: 'db') . ';port=' . ($_ENV['DB_PORT'] ?? getenv('DB_PORT') ?: '3306') . ';dbname=' . ($_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: 'tech_store') . ';charset=utf8mb4',
            $_ENV['DB_USER'] ?? getenv('DB_USER') ?: 'techstore',
            $_ENV['DB_PASSWORD'] ?? getenv('DB_PASSWORD') ?: 'techstore',
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }
    return $pdo;
}
