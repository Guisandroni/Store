# 🛒 Store Items - Sistema de Gerenciamento de Produtos

Sistema full-stack para gerenciamento de produtos com React + Express + Prisma + SQLite.

## 🚀 Tecnologias

### Backend
- **Node.js** + **Express** - API REST
- **Prisma ORM** - Gerenciamento de banco de dados
- **SQLite** - Banco de dados leve e portátil

### Frontend
- **React 18** - Interface do usuário
- **Vite** - Build tool moderna
- **Chakra UI** - Componentes e estilização
- **Zustand** - Gerenciamento de estado
- **React Router** - Navegação

## 📁 Estrutura do Projeto

```
Store-Items/
├── backend/
│   ├── config/
│   │   └── db.js           # Cliente Prisma
│   ├── controllers/
│   │   └── produto.controller.js
│   ├── routes/
│   │   └── produto.routes.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── navbar.jsx
│   │   │   └── produtoCard.jsx
│   │   ├── pages/
│   │   │   ├── home.jsx
│   │   │   └── CreatePage.jsx
│   │   ├── config/
│   │   │   └── api.js      # Configuração de URLs
│   │   └── App.jsx
│   ├── store/
│   │   └── produto.js      # Zustand store
│   └── vite.config.js      # Proxy de desenvolvimento
│
├── prisma/
│   ├── schema.prisma       # Schema do banco
│   ├── migrations/         # Histórico de migrações
│   └── seed.js            # Dados de exemplo
│
├── database.sqlite         # Banco de dados
├── DEPLOY.md              # Guia completo de deploy
└── package.json
```

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/Store-Items.git
cd Store-Items
```

### 2. Instale as dependências
```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 3. Configure o banco de dados
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Popular com dados de exemplo (opcional)
npm run seed
```

## 🎮 Como Usar

### Desenvolvimento

**Opção 1: Executar separadamente**
```bash
# Terminal 1 - Backend (porta 2000)
npm run dev

# Terminal 2 - Frontend (porta 5173)
cd frontend
npm run dev
```

**Opção 2: Executar com concurrently (se configurado)**
```bash
npm run dev:all
```

Acesse:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:2000/api/produtos`
- Prisma Studio: `npx prisma studio`

### Produção

```bash
# Build do frontend
npm run build

# Iniciar servidor
npm start
```

## 📡 Como a Comunicação Funciona

### 🏠 Desenvolvimento
```
┌─────────────────┐         ┌──────────────────┐
│   Frontend      │         │     Backend      │
│  localhost:5173 │ ─────>  │  localhost:2000  │
│   (Vite Proxy)  │         │   (Express API)  │
└─────────────────┘         └──────────────────┘
```

- O **Vite** tem um proxy configurado
- Requisições para `/api/*` são redirecionadas para `http://localhost:2000`
- Não há problemas de CORS

### ☁️ Produção (Deploy Separado)
```
┌──────────────────┐         ┌───────────────────┐
│   Frontend       │         │     Backend       │
│ Vercel/Netlify   │ ─────>  │  Railway/Render   │
│ (React Build)    │         │  (Express + CORS) │
└──────────────────┘         └───────────────────┘
```

- Frontend usa variável `VITE_API_URL`
- Backend precisa configurar CORS
- Ver `DEPLOY.md` para detalhes

## 🎯 Funcionalidades

- ✅ **Listar produtos** - Grid responsivo com todos os produtos
- ✅ **Criar produto** - Formulário com validação
- ✅ **Editar produto** - Modal de edição inline
- ✅ **Deletar produto** - Confirmação com toast
- ✅ **Validação de URL** - Apenas URLs válidas para imagens
- ✅ **Validação de preço** - Conversão automática para número
- ✅ **Dark mode** - Interface clara/escura
- ✅ **Responsivo** - Funciona em mobile, tablet e desktop

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/produtos` | Lista todos os produtos |
| POST | `/api/produtos` | Cria um novo produto |
| PUT | `/api/produtos/:id` | Atualiza um produto |
| DELETE | `/api/produtos/:id` | Deleta um produto |

### Exemplo de Produto
```json
{
  "name": "Notebook Dell",
  "price": 3499.99,
  "image": "https://example.com/image.jpg"
}
```

## 🗄️ Banco de Dados

### Schema Prisma
```prisma
model Produto {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  image     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Comandos Úteis

```bash
# Visualizar dados no navegador
npx prisma studio

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Resetar banco de dados
npx prisma migrate reset

# Popular banco com dados de exemplo
npm run seed
```

## 🔐 Variáveis de Ambiente

### Backend (`.env`)
```bash
PORT=2000
NODE_ENV=development
```

### Frontend (`.env.production`)
```bash
# Deixe vazio em dev, configure em produção
VITE_API_URL=https://seu-backend.com
```

## 🚀 Deploy

Veja o guia completo em **[DEPLOY.md](./DEPLOY.md)** com instruções para:
- Deploy monolito (Render, Railway)
- Deploy separado (Vercel + Railway)
- Configuração de CORS
- Variáveis de ambiente

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o backend em modo watch
cd frontend && npm run dev  # Inicia o frontend

# Build
npm run build           # Build completo (backend + frontend)

# Produção
npm start              # Inicia o servidor em produção

# Banco de Dados
npm run seed           # Popula o banco com dados de exemplo
npx prisma studio      # Interface visual do banco
npx prisma generate    # Gera o cliente Prisma
npx prisma migrate dev # Cria e aplica migrações
```

## 📝 Migrações Realizadas

### Histórico de ORMs
1. **MongoDB + Mongoose** → 2. **SQLite + Sequelize** → 3. **SQLite + Prisma** ✅

### Vantagens do Prisma
- ✅ Type-safety e auto-complete
- ✅ Schema declarativo e legível
- ✅ Migrações automáticas e versionadas
- ✅ Prisma Studio (interface visual)
- ✅ Performance otimizada
- ✅ Suporte multi-database

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento full-stack.

---

**📚 Documentação adicional:**
- [Guia de Deploy](./DEPLOY.md)
- [Documentação do Backend](./backend/README.md)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vite Docs](https://vitejs.dev)
