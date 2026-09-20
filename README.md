# app-mobile-api

API do aplicativo de controle financeiro.

## Stack
- TypeScript + Express
- Prisma + PostgreSQL/Supabase
- JWT + bcrypt
- OpenAPI
- Vercel

## Desenvolvimento
```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run dev
```

Login de demonstração: `admin@example.com` / `admin123`.

O frontend não acessa o Supabase diretamente; todo acesso ao banco passa pela API.
