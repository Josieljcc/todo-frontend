# Todo App Frontend

Aplicação frontend para gerenciamento de tarefas construída com React, TypeScript, Rsbuild e React Query.

## 🚀 Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Rsbuild** - Build tool moderna e rápida
- **React Router** - Roteamento
- **React Query** - Gerenciamento de estado do servidor
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização
- **OpenAPI TypeScript** - Geração de tipos a partir da especificação OpenAPI

## 📋 Pré-requisitos

- Node.js 18+ ou Bun
- npm, yarn, pnpm ou bun

## 🔧 Setup

### Instalação

```bash
# Usando bun (recomendado)
bun install

# Ou usando npm
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://api-todo.infoos.shop
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
bun run dev

# Ou usando npm
npm run dev
```

O app estará disponível em [http://localhost:3000](http://localhost:3000).

### Build

```bash
# Build para produção
bun run build

# Preview do build de produção localmente
bun run preview
```

### Qualidade de Código

```bash
# Lint do código
bun run check

# Formatação do código
bun run format
```

### Tipos da API

```bash
# Gera tipos TypeScript a partir da especificação OpenAPI
bun run generate:types
```

Este comando baixa a especificação OpenAPI do backend e gera tipos TypeScript em `src/api/types.ts`.

### Storybook

```bash
# Inicia o Storybook
bun run storybook

# Build do Storybook
bun run build-storybook
```

## 📁 Estrutura do Projeto

```
src/
├── api/                # Requisições à API e tipos gerados
│   ├── types.ts        # Tipos gerados automaticamente (não editar)
│   └── index.ts        # Exportações centralizadas
├── assets/             # Imagens, fontes, etc.
├── components/         # Componentes globais reutilizáveis
├── modules/            # Módulos principais da aplicação
│   ├── auth/          # Módulo de Autenticação
│   └── tasks/         # Módulo de Tarefas
├── layouts/           # Estruturas de página (Header, Footer, Sidebar)
├── routes/            # Definição das rotas (React Router)
├── store/             # Gerenciamento de estado global
├── utils/              # Funções utilitárias (formatação, validação)
└── App.tsx            # Componente raiz
```

## 🔌 API Types

Os tipos da API são gerados automaticamente a partir da especificação OpenAPI do backend. Para usar:

```typescript
import type { paths, components } from "@/api";

// Exemplo: tipo de resposta de login
type AuthResponse = components["schemas"]["handlers.AuthResponse"];

// Exemplo: tipo de requisição de login
type LoginRequest = components["schemas"]["handlers.LoginRequest"];

// Exemplo: tipo de tarefa
type Task = components["schemas"]["models.Task"];
```

### Regenerar Tipos

Se a API for atualizada, regenere os tipos:

```bash
bun run generate:types
```

**⚠️ Atenção:** Não edite manualmente o arquivo `src/api/types.ts`. Ele é gerado automaticamente.

## 🏗️ Arquitetura

A aplicação segue uma arquitetura modular:

- **Módulos**: Cada funcionalidade (Auth, Tasks) é um módulo independente
- **Componentes**: Componentes reutilizáveis compartilhados
- **Hooks**: Lógica reutilizável usando React Query
- **API Client**: Cliente HTTP centralizado com interceptadores
- **Rotas Protegidas**: Sistema de autenticação e proteção de rotas

## 📚 Recursos

- [Rsbuild Documentation](https://rsbuild.rs) - Documentação do Rsbuild
- [React Query](https://tanstack.com/query) - Documentação do React Query
- [React Router](https://reactrouter.com) - Documentação do React Router
- [Tailwind CSS](https://tailwindcss.com) - Documentação do Tailwind CSS

## 📝 Convenções de Commit

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de manutenção
- `build:` - Mudanças no sistema de build

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request
