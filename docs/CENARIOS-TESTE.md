# Cenários de Teste — App Mobile API

## 1. Health e documentação
- **CT-A01 — Health check:** GET /api/health; esperado HTTP 200 e status "ok".
- **CT-A02 — Documentação:** GET /api/docs; esperado HTTP 200 e documento OpenAPI válido.

## 2. Autenticação
- **CT-A03 — Login válido:** POST /api/auth/login com credenciais válidas; esperado HTTP 200 e token JWT.
- **CT-A04 — Login com senha inválida:** esperado HTTP 401.
- **CT-A05 — Login sem campos obrigatórios:** esperado HTTP 400.
- **CT-A06 — Rota protegida sem token:** GET /api/dashboard sem Authorization; esperado HTTP 401.
- **CT-A07 — Token inválido:** usar Bearer inválido; esperado HTTP 401.
- **CT-A08 — Token válido:** acessar rota protegida com JWT válido; esperado HTTP 200.

## 3. Dashboard
- **CT-A09 — Dashboard do tenant:** esperado retorno de tenantId, receitas, despesas, saldo e contas ativas.
- **CT-A10 — Cálculo:** saldo deve corresponder a receitas menos despesas das transações ativas.

## 4. Contas
- **CT-A11 — Listagem paginada:** GET /api/contas?page=1&pageSize=10; validar items, page, pageSize, total e totalPages.
- **CT-A12 — Inclusão:** POST /api/contas com dados válidos; esperado HTTP 201.
- **CT-A13 — Alteração:** PUT /api/contas/:id; esperado HTTP 200.
- **CT-A14 — Exclusão:** DELETE /api/contas/:id; esperado HTTP 204.
- **CT-A15 — Registro inexistente:** alterar/excluir ID de outro tenant ou inexistente; esperado HTTP 404.
- **CT-A16 — Isolamento multi-tenant:** usuário do tenant A não pode consultar, alterar ou excluir registros do tenant B.

## 5. Categorias
- **CT-A17 — CRUD:** validar GET, POST, PUT e DELETE.
- **CT-A18 — Paginação:** validar page, pageSize, total e totalPages.
- **CT-A19 — Isolamento:** validar tenantId em todas as operações.

## 6. Transações
- **CT-A20 — Listagem:** validar paginação, ordenação por data decrescente e retorno de conta/categoria.
- **CT-A21 — Inclusão de receita:** POST com tipo R e valor válido; esperado HTTP 201.
- **CT-A22 — Inclusão de despesa:** POST com tipo D e valor válido; esperado HTTP 201.
- **CT-A23 — Alteração:** PUT /api/transacoes/:id; esperado HTTP 200.
- **CT-A24 — Exclusão:** DELETE /api/transacoes/:id; esperado HTTP 204.
- **CT-A25 — Data inválida:** enviar data inválida; esperado tratamento de erro HTTP 400.
- **CT-A26 — Valor inválido:** enviar valor não numérico; esperado tratamento de erro HTTP 400.
- **CT-A27 — Isolamento:** transação de outro tenant não pode ser consultada, alterada ou excluída.

## 7. Paginação e limites
- **CT-A28 — Página inválida:** page <= 0 deve ser normalizada para 1.
- **CT-A29 — PageSize inválido:** pageSize <= 0 deve assumir 10.
- **CT-A30 — PageSize máximo:** pageSize acima de 100 deve ser limitado a 100.
- **CT-A31 — Página além do total:** retornar items vazio e metadados de paginação coerentes.

## 8. Segurança
- **CT-A32 — Tenant não pode vir do cliente:** ao criar registro, tenantId enviado no body deve ser ignorado/substituído pelo tenant do JWT.
- **CT-A33 — Senha:** resposta de login não deve retornar o hash da senha.
- **CT-A34 — CORS:** validar origem conforme CORS_ORIGIN configurado.
- **CT-A35 — JWT:** validar expiração e assinatura.

## Critérios de aceite
Os cenários de autenticação, isolamento multi-tenant, CRUD, paginação e transações devem passar antes do deploy.
