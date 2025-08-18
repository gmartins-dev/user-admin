# 🚀 Sistema de Gerenciamento de Usuários

Uma aplicação web completa de gerenciamento de usuários desenvolvida com **Next.js 15**, **TypeScript**, **Tailwind CSS** e **Shadcn/ui**.

## ✨ Funcionalidades

### 👥 Para Usuários
- **Cadastro Público**: Registro com validação de senha e preenchimento automático de endereço via CEP
- **Login Seguro**: Autenticação com email e senha
- **Dashboard Pessoal**: Área protegida para visualizar informações pessoais
- **Perfil Completo**: Visualização de dados pessoais e de localização
- **Modo Escuro**: Interface adaptável com tema claro/escuro/sistema

### 🛡️ Para Administradores
- **Painel Administrativo**: Interface completa para gerenciamento de usuários
- **Estatísticas em Tempo Real**: Dashboards com métricas importantes
- **CRUD de Usuários**: Listar, editar e deletar usuários
- **Controle de Acesso**: Proteção de rotas por nível de permissão
- **Interface Moderna**: Design responsivo com suporte a modo escuro

## 🚀 Funcionalidades Implementadas

### Performance & Cache
- **Cache Inteligente**: Sistema de cache Next.js para estatísticas e listagem de usuários (`lib/cache.ts`)
- **Loading States**: Componentes skeleton para melhor UX durante carregamento
- **Turbopack**: Desenvolvimento mais rápido com `--turbopack` habilitado

### Segurança
- **Headers de Segurança**: Proteção contra XSS, clickjacking e outros ataques via middleware
- **Validações Robustas**: Senhas complexas e validação de domínios de email
- **Middleware Avançado**: Controle rigoroso de acesso e redirecionamentos baseado em roles
- **Hash de Senhas**: bcryptjs com salt rounds seguros
- **Proteção CSRF**: Proteção nativa do NextAuth.js

### UX/UI
- **Hooks Customizados**: Hooks reutilizáveis para operações async, debounce, localStorage e mais (`hooks/index.ts`)
- **Sistema de Feedback**: Componente completo de avaliação com estrelas e comentários
- **SEO Otimizado**: Meta tags e dados estruturados para melhor indexação (`lib/seo.ts`)
- **Hidratação Segura**: Prevenção de erros de hidratação SSR/Client com ThemeProvider
- **Notificações**: Sistema de toast com Sonner para feedback visual

### Testes
- **Configuração Jest**: Setup completo com Jest e Testing Library
- **Ambiente de Teste**: Configurado para componentes React com jsdom
- **Scripts de Teste**: Comandos para execução, watch mode e cobertura de código

## 🔧 Correções Técnicas

### Problema de Hidratação Resolvido
O projeto implementa várias estratégias para evitar erros de hidratação entre servidor e cliente:

- **ThemeProvider seguro**: Usa estado `mounted` para evitar diferenças SSR/Client
- **Script inline**: Aplica tema escuro imediatamente no `<head>` antes da hidratação
- **ClientOnly component**: Para componentes que dependem exclusivamente do browser
- **suppressHydrationWarning**: Em elementos que podem ter atributos dinâmicos

### Estratégias Implementadas:
```tsx
// 1. Estado mounted para aguardar hidratação
const [mounted, setMounted] = useState(false)

// 2. Script inline para tema instantâneo
<script dangerouslySetInnerHTML={{
  __html: `try { if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark') } catch (e) {}`
}} />

// 3. Componente ClientOnly para renderização condicional
<ClientOnly fallback={<Skeleton />}>
  <ComponenteQueUsaBrowser />
</ClientOnly>
```

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4 + Shadcn/ui
- **Banco de Dados**: SQLite + Prisma ORM
- **Autenticação**: NextAuth.js v4
- **Validação**: Zod + React Hook Form
- **API Externa**: ViaCEP para consulta de endereços
- **Hash de Senhas**: bcryptjs
- **Notificações**: Sonner (toast)
- **Ícones**: Lucide React
- **Tema**: Sistema customizado para modo claro/escuro
- **Gerenciador**: pnpm

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/gmartins-dev/user-admin
cd user-admin
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
```bash
# O arquivo .env.local já está configurado com valores padrão
# Para produção, altere NEXTAUTH_SECRET para um valor seguro
```

### 4. Configure o banco de dados
```bash
# Criar o banco de dados
pnpm db:push

# Popular com dados iniciais (usuário admin)
pnpm db:seed
```

### 5. Execute o projeto
```bash
# Desenvolvimento
pnpm dev

# Ou para produção
pnpm build
pnpm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🔐 Credenciais de Teste

### Administrador
- **Email**: `admin@example.com`
- **Senha**: `Admin123!@#`

## 📁 Estrutura do Projeto

```
├── app/                          # App Router do Next.js
│   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   ├── login/                # Página de login
│   │   └── register/             # Página de registro
│   ├── (protected)/              # Grupo de rotas protegidas
│   │   ├── admin/                # Painel administrativo
│   │   └── dashboard/            # Dashboard do usuário
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth.js
│   │   ├── cep/                  # Consulta de CEP
│   │   └── users/                # CRUD de usuários
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Página inicial
├── components/                   # Componentes React
│   ├── admin/                    # Componentes administrativos
│   ├── auth/                     # Componentes de autenticação
│   ├── dashboard/                # Componentes do dashboard
│   ├── ui/                       # Componentes de UI (Shadcn)
│   ├── client-only.tsx           # Componente para hidratação segura
│   ├── feedback-dialog.tsx       # Sistema de feedback com avaliações
│   ├── theme-provider.tsx        # Provider de temas
│   └── theme-toggle.tsx          # Toggle de tema claro/escuro
├── hooks/                        # Hooks customizados
│   └── index.ts                  # Hooks para async, debounce, localStorage, etc.
├── lib/                          # Utilitários e configurações
│   ├── auth.ts                   # Configuração NextAuth.js
│   ├── cache.ts                  # Sistema de cache Next.js
│   ├── db.ts                     # Cliente Prisma
│   ├── seo.ts                    # Utilitários de SEO e meta tags
│   ├── utils.ts                  # Utilitários gerais
│   └── validations.ts            # Schemas de validação Zod
├── prisma/                       # Configuração do banco
│   ├── schema.prisma             # Schema do banco
│   └── seed.ts                   # Dados iniciais
├── types/                        # Tipos TypeScript
└── middleware.ts                 # Middleware de autenticação
```

## 🔄 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                    # Inicia servidor de desenvolvimento (com Turbopack)

# Banco de dados
pnpm db:push               # Aplica mudanças no schema
pnpm db:studio             # Abre Prisma Studio
pnpm db:seed               # Popula banco com dados iniciais
pnpm db:reset              # Reseta e popula o banco
pnpm db:migrate            # Executa migrações
pnpm db:generate           # Gera cliente Prisma

# Produção
pnpm build                 # Build para produção
pnpm start                 # Inicia servidor de produção

# Qualidade de código
pnpm lint                  # Executa linter
pnpm lint:fix              # Corrige problemas do linter automaticamente
pnpm type-check            # Verifica tipos TypeScript

# Testes
pnpm test                  # Executa testes
pnpm test:watch            # Executa testes em modo watch
pnpm test:coverage         # Executa testes com cobertura

# Análise
pnpm analyze               # Analisa bundle da aplicação
```

## 🛡️ Segurança

- **Autenticação**: Implementada com NextAuth.js v4
- **Autorização**: Middleware protege rotas baseado em roles (USER/ADMIN)
- **Validação**: Validação client-side e server-side com Zod
- **Hash de Senhas**: bcryptjs com salt rounds seguros
- **Proteção CSRF**: Proteção nativa do NextAuth.js
- **Headers de Segurança**:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security
  - Referrer-Policy: origin-when-cross-origin
- **Sanitização**: Validação de entrada em todas as APIs

## 📝 Validações Implementadas

### Senha
- Mínimo 8 caracteres
- Pelo menos 1 letra minúscula
- Pelo menos 1 letra maiúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial

### CEP
- Formato brasileiro (00000-000)
- Validação via API ViaCEP
- Preenchimento automático de cidade e estado

### Email
- Validação de formato padrão
- Verificação de unicidade no banco

## 🌐 APIs Utilizadas

### ViaCEP
- **URL**: `https://viacep.com.br/ws/{cep}/json/`
- **Uso**: Consulta de endereços por CEP
- **Cache**: Revalidação a cada 1 hora

## ⚡ Sistema de Cache

O projeto implementa um sistema de cache inteligente usando `unstable_cache` do Next.js:

### Cache de Estatísticas (`getUserStats`)
- **Revalidação**: 5 minutos (300 segundos)
- **Tags**: `['users']`
- **Dados**: Total de usuários, admins, usuários regulares e recentes

### Cache de Usuários (`getCachedUsers`)
- **Revalidação**: 1 minuto (60 segundos)
- **Tags**: `['users']`
- **Dados**: Lista completa de usuários com informações básicas

### Invalidação de Cache
- Automática via tags quando dados de usuários são modificados
- Manual via revalidação por tempo determinado

## 🎣 Hooks Customizados

O projeto inclui uma biblioteca robusta de hooks reutilizáveis em `hooks/index.ts`:

### `useAsyncOperation<T>()`
- Gerencia estados de loading, erro e sucesso para operações assíncronas
- Integração automática com toast notifications
- Controle de execução e reset de estados

### `useDebounce<T>(value, delay)`
- Implementa debounce para otimizar performance em inputs
- Reduz chamadas de API em tempo real

### `useMediaQuery(query)`
- Hook para responsividade baseado em media queries
- Detecta mudanças no tamanho da tela em tempo real

### `useInfiniteScroll(callback, threshold)`
- Implementa scroll infinito para listas grandes
- Configurable threshold para trigger do callback

### `useLocalStorage<T>(key, initialValue)`
- Hook para localStorage com SSR safety
- Gerencia hidratação segura entre servidor e cliente
- Tratamento de erros automático

## 🎨 Design System

- **Framework CSS**: Tailwind CSS 4
- **Componentes**: Shadcn/ui com Radix UI
- **Abordagem**: Mobile-first, responsivo
- **Tema**: Sistema de temas com suporte a modo claro/escuro/sistema
- **Ícones**: Lucide React
- **Tipografia**: Fontes do sistema otimizadas
- **Animações**: Componentes com transições suaves

## 🔧 Configurações de Desenvolvimento

### ESLint
- Configuração padrão do Next.js 15
- Regras TypeScript habilitadas
- Suporte para JSX e React hooks

### TypeScript
- Strict mode habilitado
- Paths configurados para imports absolutos
- Tipos customizados para NextAuth

### Tailwind CSS
- Configuração v4 com PostCSS
- Plugins Shadcn/ui integrados
- Classes utilitárias personalizadas

### Jest
- Configuração para testes unitários
- Testing Library integrada
- Ambiente jsdom para componentes React

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm, md, lg, xl (Tailwind padrão)
- **Componentes**: Totalmente responsivos
- **Layout**: Adaptativo em todas as telas

## 🚦 Status do Projeto

✅ **Implementado**
- [x] Autenticação e autorização com roles
- [x] CRUD de usuários completo
- [x] Dashboard administrativo com estatísticas
- [x] Validação de formulários robusta
- [x] Integração com API de CEP (ViaCEP)
- [x] Interface responsiva e moderna
- [x] Sistema de temas (claro/escuro/sistema)
- [x] Cache inteligente para performance
- [x] Sistema de feedback dos usuários
- [x] SEO otimizado com meta tags
- [x] Hooks customizados reutilizáveis
- [x] Configuração de testes
- [x] Headers de segurança
