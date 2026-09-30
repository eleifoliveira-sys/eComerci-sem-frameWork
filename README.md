# Tech Store

## Stack

- Frontend: HTML, CSS, Bootstrap e JavaScript puro
- Backend: PHP 8.3, API REST simples e PDO
- Banco: MySQL 8
- Ambiente: Docker Compose

## Regras desta etapa

- Visitantes podem navegar pelo catálogo.
- Carrinho NÃO é salvo antes do login.
- Para adicionar ao carrinho é necessário estar autenticado.
- Cada usuário possui no máximo um carrinho.
- O pedido baixa o estoque dentro de transação.
- Status: aguardando_pagamento -> pago -> enviado -> entregue.
- Cancelamento permitido antes do pagamento, com devolução do estoque.
- Pagamento é simulado.

## Subir

```bash
docker compose up --build
```

Frontend: http://localhost:8080
API: http://localhost:8000
MySQL: localhost:3307

## Próximas implementações

CRUD administrativo completo, atualização de quantidade, consulta de pedidos, transições protegidas de status, upload de imagens, validações e documentação da API.

tech-store/
│
├── docker-compose.yml
├── .env
├── .gitignore
├── README.md
│
├── frontend/
│ ├── Dockerfile
│ ├── nginx.conf
│ │
│ ├── index.html
│ ├── produto.html
│ ├── login.html
│ ├── cadastro.html
│ ├── carrinho.html
│ ├── checkout.html
│ ├── pedidos.html
│ ├── pedido.html
│ ├── perfil.html
│ │
│ ├── admin/
│ │ ├── index.html
│ │ ├── produtos.html
│ │ ├── categorias.html
│ │ ├── estoque.html
│ │ └── pedidos.html
│ │
│ ├── css/
│ │ ├── style.css
│ │ ├── responsivo.css
│ │ └── admin.css
│ │
│ ├── js/
│ │ ├── api.js
│ │ ├── app.js
│ │ ├── auth.js
│ │ ├── produtos.js
│ │ ├── categorias.js
│ │ ├── carrinho.js
│ │ ├── checkout.js
│ │ ├── pedidos.js
│ │ ├── perfil.js
│ │ │
│ │ └── admin/
│ │ ├── produtos.js
│ │ ├── categorias.js
│ │ ├── estoque.js
│ │ └── pedidos.js
│ │
│ └── assets/
│ ├── images/
│ └── icons/
│
├── backend/
│ ├── Dockerfile
│ │
│ ├── public/
│ │ └── index.php
│ │
│ ├── config/
│ │ ├── database.php
│ │ └── config.php
│ │
│ ├── api/
│ │ ├── auth/
│ │ │ ├── login.php
│ │ │ ├── cadastro.php
│ │ │ └── logout.php
│ │ │
│ │ ├── produtos/
│ │ │ ├── listar.php
│ │ │ ├── buscar.php
│ │ │ ├── detalhes.php
│ │ │ ├── criar.php
│ │ │ ├── atualizar.php
│ │ │ └── excluir.php
│ │ │
│ │ ├── categorias/
│ │ │ ├── listar.php
│ │ │ ├── criar.php
│ │ │ ├── atualizar.php
│ │ │ └── excluir.php
│ │ │
│ │ ├── carrinho/
│ │ │ ├── listar.php
│ │ │ ├── adicionar.php
│ │ │ ├── atualizar.php
│ │ │ └── remover.php
│ │ │
│ │ ├── estoque/
│ │ │ ├── consultar.php
│ │ │ └── atualizar.php
│ │ │
│ │ └── pedidos/
│ │ ├── criar.php
│ │ ├── listar.php
│ │ ├── detalhes.php
│ │ ├── cancelar.php
│ │ └── status.php
│ │
│ ├── models/
│ │ ├── Usuario.php
│ │ ├── Produto.php
│ │ ├── Categoria.php
│ │ ├── Carrinho.php
│ │ ├── CarrinhoItem.php
│ │ ├── Pedido.php
│ │ └── PedidoItem.php
│ │
│ ├── services/
│ │ ├── AuthService.php
│ │ ├── ProdutoService.php
│ │ ├── CarrinhoService.php
│ │ ├── EstoqueService.php
│ │ └── PedidoService.php
│ │
│ ├── middleware/
│ │ ├── auth.php
│ │ └── admin.php
│ │
│ └── uploads/
│ └── produtos/
│
└── database/
└── init.sql
