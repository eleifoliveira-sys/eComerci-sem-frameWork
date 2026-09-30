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
