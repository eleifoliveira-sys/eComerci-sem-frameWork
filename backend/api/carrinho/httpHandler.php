<?php

match($_SERVER['REQUEST_METHOD']) {
    "POST" => require __DIR__ . "/adicionar.php",
    "GET" => require __DIR__ . "/listar.php",
    "DELETE" => require __DIR__ . "/remover.php",
};
