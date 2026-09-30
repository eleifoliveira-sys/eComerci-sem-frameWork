## Arquitetura do Projeto

ecommerce/
│
├── docker-compose.yml
├── .env
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
│ └── checkout.html
│ │
│ ├── css/
│ │ └── style.css
│ │
│ ├── js/
│ │ ├── api.js
│ │ ├── app.js
│ │ ├── produtos.js
│ │ ├── carrinho.js
│ │ └── auth.js
│ │
│ └── assets/
│ └── icons/
│
├── backend/
│ ├── Dockerfile
│ │
│ ├── public/
│ │ └── index.php
│ │
│ ├── config/
│ │ └── database.php
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
│ │ │ └── detalhes.php
│ │ │
│ │ ├── categorias/
│ │ │ └── listar.php
│ │ │
│ │ ├── carrinho/
│ │ │ ├── listar.php
│ │ │ ├── adicionar.php
│ │ │ ├── atualizar.php
│ │ │ └── remover.php
│ │ │
│ │ └── pedidos/
│ │ └── criar.php
│ │
│ └── uploads/
│ └── produtos/
│
└── database/
└── init.sql

## Próxima etapa técnica

1. Criar banco MySQL.
2. Implementar PDO e prepared statements.
3. Implementar cadastro/login com `password_hash()` e `password_verify()`.
4. Criar CRUD de produtos/categorias.
5. Persistir carrinho somente depois da autenticação.
6. Criar checkout e pedidos.
7. Adicionar painel administrativo.
