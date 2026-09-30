# Base do backend

A interface está pronta para conectar a um backend PHP puro.

## Regra do carrinho
- Visitante: carrinho fica somente na sessão do navegador/servidor durante a visita.
- Antes do login: NÃO gravar carrinho no banco e NÃO usar localStorage para persistência.
- Após autenticação: copiar os itens da sessão para `cart_items` e associar ao `user_id`.
- Logout: a sessão pode ser encerrada; o carrinho persistido continua vinculado à conta.

## Endpoints sugeridos
- POST /api/auth/register.php
- POST /api/auth/login.php
- POST /api/auth/logout.php
- GET  /api/products.php
- GET  /api/products/{id}.php
- GET  /api/cart.php
- POST /api/cart/add.php
- PATCH /api/cart/update.php
- DELETE /api/cart/remove.php
- POST /api/orders/create.php

## Banco
Tabelas mínimas:
users(id, name, email, password_hash, created_at)
products(id, name, slug, description, price, old_price, stock, category_id, image, created_at)
categories(id, name, slug)
cart_items(id, user_id, product_id, quantity, created_at, updated_at)
orders(id, user_id, status, total, created_at)
order_items(id, order_id, product_id, quantity, unit_price)
