# 🎯 ProductRadar

Interface web moderna para análise inteligente de produtos e-commerce. Analise reviews e avaliações de produtos da Amazon e Mercado Livre de forma automatizada usando inteligência artificial.

## 📋 Sobre o Projeto

ProductRadar é uma aplicação frontend que fornece uma interface intuitiva e responsiva para consumir a API de análise de produtos. Com ela você pode:

- **Analisar Produtos** inserindo apenas a URL do marketplace
- **Visualizar Recomendações** baseadas em análise de sentimento
- **Explorar Métricas** como distribuição de estrelas e score de confiabilidade
- **Acompanhar Histórico** de análises realizadas (com login)
- **Identificar Pontos Fortes/Fracos** do produto automaticamente

Interface otimizada para desktop e mobile com design clean e moderno.

## 🚀 Tecnologias

- **React 19** - Biblioteca de interfaces de usuário
- **TypeScript** - Tipagem estática e maior segurança no código
- **Vite** - Build tool rápido e leve
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento client-side
- **Roboto** - Tipografia moderna do Google Fonts

## ✨ Funcionalidades

- ✅ Análise de produtos por URL (Amazon e Mercado Livre)
- ✅ Visualização detalhada de métricas e distribuição de avaliações
- ✅ Sistema de autenticação JWT (opcional para análises)
- ✅ Histórico privado de análises por usuário
- ✅ Design responsivo (mobile-first)
- ✅ Recomendações destacadas com score de confiabilidade
- ✅ Dark mode no header com gradientes

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)
- [ProductRadar API](https://github.com/mauriciocr22/productradar-api) rodando localmente

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/mauriciocr22/productradar.git
cd productradar
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e ajuste a URL da API se necessário.

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_BASE_URL` | URL base da API backend | `http://localhost:3001` |

> **Nota:** Certifique-se de que a API backend está rodando antes de iniciar o frontend.

## 🏃 Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
npm run preview
```

## 📱 Páginas Principais

- **Home** (`/`) - Formulário de análise de produtos
- **History** (`/history`) - Histórico de análises (requer login)
- **Analysis** (`/analysis/:id`) - Detalhes completos de uma análise
- **Login** (`/login`) - Autenticação de usuário
- **Register** (`/register`) - Cadastro de novo usuário

## 🎨 Estrutura do Projeto

```
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── URLInput.tsx
│   │   ├── AnalysisResult.tsx
│   │   └── ...
│   ├── contexts/          # Context API (Auth)
│   ├── pages/             # Páginas/rotas
│   │   ├── Home.tsx
│   │   ├── History.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── services/          # Serviços de API
│   │   ├── api.ts
│   │   └── auth.service.ts
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Componente raiz
│   └── main.tsx           # Entry point
├── .env.example
├── index.html
├── tailwind.config.js
└── package.json
```

## 🔐 Autenticação

O app suporta dois modos de uso:

**Modo Anônimo:**
- Análises podem ser feitas sem login
- Não salva histórico

**Modo Autenticado:**
- Login via email/senha
- Histórico pessoal de análises
- Token JWT armazenado no localStorage

## 📊 Exemplo de Uso

1. Acesse a home
2. Cole a URL de um produto (ex: link da Amazon)
3. Clique em "Analisar"
4. Visualize:
   - Recomendação (comprar/não comprar)
   - Score de confiabilidade
   - Distribuição de estrelas
   - Pontos fortes e fracos
   - Resumo das avaliações

## 🎯 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção

```

## 🌐 Integração com Backend

O frontend se comunica com a API através do `ApiService` que gerencia:

- Headers de autenticação (Bearer token)
- Requisições HTTP (GET, POST)
- Tratamento de erros
- Tipagem de responses

## 🎨 Design System

**Cores Principais:**
- Primary: Blue 600 (`#2563eb`)
- Secondary: Purple 600 (`#9333ea`)
- Success: Green 500 (`#22c55e`)
- Error: Red 500 (`#ef4444`)

**Tipografia:**
- Font Family: Roboto
- Weights: 300 (Light), 400 (Regular), 700 (Bold), 900 (Black)

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

Desenvolvido por [Seu Nome](https://github.com/mauriciocr22) | [LinkedIn](https://linkedin.com/in/mauriciocr22)
