<?php
    
    if(isset($productId)){
        require __DIR__ . '/detalhes.php';
    } else {
        require __DIR__ . '/listar.php';
    }
?>