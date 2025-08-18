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

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + Shadcn/ui
- **Banco de Dados**: SQLite + Prisma ORM
- **Autenticação**: NextAuth.js
- **Validação**: Zod + React Hook Form
- **API Externa**: ViaCEP para consulta de endereços
- **Hash de Senhas**: bcryptjs
- **Notificações**: Sonner (toast)
- **Tema**: Sistema customizado para modo claro/escuro

## 📋 Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
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
│   └── ui/                       # Componentes de UI (Shadcn)
├── lib/                          # Utilitários e configurações
│   ├── auth.ts                   # Configuração NextAuth.js
│   ├── db.ts                     # Cliente Prisma
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
pnpm dev                    # Inicia servidor de desenvolvimento

# Banco de dados
pnpm db:push               # Aplica mudanças no schema
pnpm db:studio             # Abre Prisma Studio
pnpm db:seed               # Popula banco com dados iniciais
pnpm db:reset              # Reseta e popula o banco

# Produção
pnpm build                 # Build para produção
pnpm start                 # Inicia servidor de produção
pnpm lint                  # Executa linter
```

## 🛡️ Segurança

- **Autenticação**: Implementada com NextAuth.js
- **Autorização**: Middleware protege rotas baseado em roles
- **Validação**: Validação client-side e server-side com Zod
- **Hash de Senhas**: bcryptjs com salt rounds seguros
- **Proteção CSRF**: Proteção nativa do NextAuth.js
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

## 🎨 Design System

- **Framework**: Tailwind CSS
- **Componentes**: Shadcn/ui
- **Abordagem**: Mobile-first, responsivo
- **Tema**: Sistema de temas com suporte a modo claro/escuro/sistema
- **Tipografia**: Geist Sans e Geist Mono

## 🔧 Configurações de Desenvolvimento

### ESLint
- Configuração padrão do Next.js
- Regras TypeScript habilitadas

### TypeScript
- Strict mode habilitado
- Paths configurados para imports absolutos

### Tailwind CSS
- Configuração customizada
- Plugins Shadcn/ui integrados

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm, md, lg, xl (Tailwind padrão)
- **Componentes**: Totalmente responsivos
- **Layout**: Adaptativo em todas as telas

## 🚦 Status do Projeto

✅ **Concluído**
- [x] Autenticação e autorização
- [x] CRUD de usuários
- [x] Dashboard administrativo
- [x] Validação de formulários
- [x] Integração com API de CEP
- [x] Interface responsiva
- [x] Modo escuro/claro
- [x] Documentação completa

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
