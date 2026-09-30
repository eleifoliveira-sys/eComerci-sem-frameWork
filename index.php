<?php
session_start();
$products = [
    ["id"=>1,"name"=>"Tênis Urban Street","category"=>"Moda","price"=>189.90,"old_price"=>249.90,"discount"=>24,"image"=>"assets/img-product.svg"],
    ["id"=>2,"name"=>"Bolsa Minimalista","category"=>"Acessórios","price"=>119.90,"old_price"=>169.90,"discount"=>29,"image"=>"assets/img-product.svg"],
    ["id"=>3,"name"=>"Fone Bluetooth Pro","category"=>"Eletrônicos","price"=>149.90,"old_price"=>199.90,"discount"=>25,"image"=>"assets/img-product.svg"],
    ["id"=>4,"name"=>"Camiseta Oversized","category"=>"Moda","price"=>69.90,"old_price"=>89.90,"discount"=>22,"image"=>"assets/img-product.svg"],
    ["id"=>5,"name"=>"Relógio Casual","category"=>"Acessórios","price"=>99.90,"old_price"=>139.90,"discount"=>29,"image"=>"assets/img-product.svg"],
    ["id"=>6,"name"=>"Kit Skincare Daily","category"=>"Beleza","price"=>89.90,"old_price"=>119.90,"discount"=>25,"image"=>"assets/img-product.svg"],
];
?>
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Viva — Marketplace</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="topbar">
  <div class="container nav">
    <a class="logo" href="index.php">VIVA<span>.</span></a>
    <form class="search" id="searchForm"><input id="searchInput" placeholder="Buscar produtos, marcas e categorias..."><button>⌕</button></form>
    <nav class="actions">
      <button class="icon-btn" data-open="loginModal">Entrar</button>
      <button class="cart-btn" id="cartBtn">🛒 <b id="cartCount">0</b></button>
    </nav>
  </div>
</header>

<section class="hero">
 <div class="container hero-grid">
  <div><span class="eyebrow">OFERTAS DA SEMANA</span><h1>Seu estilo.<br><strong>Seu preço.</strong></h1><p>Uma experiência de marketplace rápida, simples e responsiva.</p><a class="primary" href="#products">Comprar agora</a></div>
  <div class="hero-card"><small>ATÉ</small><strong>70%</strong><span>OFF</span></div>
 </div>
</section>

<main class="container">
 <section class="categories">
   <h2>Explore por categoria</h2>
   <div class="category-row">
    <button class="cat active" data-category="Todos">Tudo</button><button class="cat" data-category="Moda">Moda</button><button class="cat" data-category="Acessórios">Acessórios</button><button class="cat" data-category="Eletrônicos">Eletrônicos</button><button class="cat" data-category="Beleza">Beleza</button>
   </div>
 </section>

 <section id="products" class="products-section">
  <div class="section-head"><div><span class="eyebrow">SELEÇÃO VIVA</span><h2>Mais vendidos</h2></div><select id="sort"><option value="default">Relevância</option><option value="low">Menor preço</option><option value="high">Maior preço</option></select></div>
  <div class="product-grid" id="productGrid">
  <?php foreach($products as $p): ?>
    <article class="product" data-name="<?=htmlspecialchars(strtolower($p['name']))?>" data-category="<?=$p['category']?>" data-price="<?=$p['price']?>">
      <div class="product-image"><span>-<?=$p['discount']?>%</span><img src="<?=$p['image']?>" alt=""></div>
      <div class="product-body"><small><?=$p['category']?></small><h3><?=$p['name']?></h3><div class="rating">★★★★★ <em>(<?=rand(18,98)?>)</em></div><del>R$ <?=number_format($p['old_price'],2,',','.')?></del><strong>R$ <?=number_format($p['price'],2,',','.')?></strong><button class="add" data-id="<?=$p['id']?>">Adicionar ao carrinho</button></div>
    </article>
  <?php endforeach; ?>
  </div>
 </section>
</main>

<aside class="cart-panel" id="cartPanel">
 <div class="cart-head"><h2>Seu carrinho</h2><button id="closeCart">×</button></div>
 <div id="cartItems" class="cart-items"></div>
 <div class="cart-footer"><div><span>Total</span><strong id="cartTotal">R$ 0,00</strong></div><button class="primary" id="checkoutBtn">Finalizar compra</button><small>Você poderá revisar tudo antes de pagar.</small></div>
</aside>
<div class="overlay" id="overlay"></div>

<div class="modal" id="loginModal">
 <div class="modal-box"><button class="modal-close" data-close>×</button><span class="eyebrow">CONTA VIVA</span><h2>Entrar ou criar conta</h2><p>O carrinho não é salvo permanentemente antes do login.</p>
 <form id="loginForm"><input type="email" id="email" placeholder="Seu e-mail" required><input type="password" id="password" placeholder="Senha" required><button class="primary">Entrar</button></form>
 <div class="demo-note">Modo demonstração: qualquer e-mail e senha válidos podem entrar.</div>
 </div>
</div>
<script>
window.PRODUCTS = <?=json_encode($products, JSON_UNESCAPED_UNICODE)?>;
</script>
<script src="assets/app.js"></script>
</body></html>