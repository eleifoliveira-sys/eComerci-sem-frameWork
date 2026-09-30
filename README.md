# VIVA — referência de e-commerce

Stack: HTML5 + CSS3 + JavaScript + PHP puro. Sem framework e sem hospedagem.

## Rodar localmente

Na pasta do projeto:

```bash
php -S localhost:8000
```

Abra:

http://localhost:8000

## Estrutura

- `index.php` — front principal + catálogo demonstrativo
- `assets/style.css` — layout responsivo
- `assets/app.js` — busca, filtros e carrinho
- `api/` — ponto de partida para autenticação, produtos, carrinho e pedidos

## Decisão importante

O carrinho do visitante é mantido apenas em memória JavaScript durante a sessão da página. Ele não é salvo no localStorage e não é gravado no banco antes do login.

No backend real, após login, a sessão pode ser sincronizada com `cart_items` usando o `user_id`.

## Próxima etapa técnica

1. Criar banco MySQL/MariaDB.
2. Implementar PDO e prepared statements.
3. Implementar cadastro/login com `password_hash()` e `password_verify()`.
4. Criar CRUD de produtos/categorias.
5. Persistir carrinho somente depois da autenticação.
6. Criar checkout e pedidos.
7. Adicionar painel administrativo.
