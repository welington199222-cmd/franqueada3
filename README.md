# Projeto de E-commerce - Cadastro de Franqueada

Este é o repositório para o site de e-commerce e processamento de pagamentos.

## Estrutura do Projeto

\`\`\`
├── app/                       # App Router do Next.js
│   ├── layout.tsx            # Layout principal com fonte Montserrat
│   ├── page.tsx              # Página inicial
│   ├── pix/                  # Página de pagamento PIX
│   └── globals.css           # Estilos globais com design tokens
├── components/               # Componentes React
│   ├── ui/                   # Componentes UI (shadcn/ui)
│   └── payment-form.tsx      # Formulário de pagamento
├── lib/                      # Utilitários e configurações
│   ├── actions.ts            # Server Actions
│   ├── utils.ts              # Funções utilitárias
│   └── validators.ts         # Schemas de validação (Zod)
├── hooks/                    # React Hooks customizados
├── public/                   # Arquivos estáticos
├── netlify.toml             # Configuração do Netlify
├── apphosting.yaml          # Configuração do Firebase App Hosting
├── components.json          # Configuração do shadcn/ui
├── next.config.mjs          # Configuração do Next.js
├── package.json             # Dependências do projeto
└── tailwind.config.ts       # Configuração do Tailwind CSS
\`\`\`

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

\`\`\`env
SYNCPAY_CLIENT_ID=seu_client_id_aqui
SYNCPAY_CLIENT_SECRET=seu_client_secret_aqui
\`\`\`

**IMPORTANTE:** No Netlify, adicione essas variáveis em:
`Site settings > Environment variables`

## Como Instalar Localmente

1. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

2. Execute o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

3. Abra [http://localhost:9002](http://localhost:9002) no navegador

## Para fazer o deploy na Netlify:

1.  **Estrutura de Pastas:** Garanta que este repositório contenha todos os arquivos do projeto na raiz (não dentro de uma subpasta). O arquivo `package.json` deve estar no nível principal.

2.  **Conexão com a Netlify:** Conecte este repositório à sua conta da Netlify.

3.  **Configurações de Build:**
    -   **Base directory:** Deixe este campo **em branco**.
    -   As outras configurações de build (`command` e `publish`) serão lidas automaticamente do arquivo `netlify.toml`.

4.  **Variáveis de Ambiente:** Adicione as seguintes variáveis nas configurações do site na Netlify:
    -   `SYNCPAY_CLIENT_ID`: O seu Client ID da SyncPay.
    -   `SYNCPAY_CLIENT_SECRET`: O seu Client Secret da SyncPay.

### Opção 1: Via GitHub (Recomendado)

1. Faça push do código para um repositório GitHub
2. Acesse [Netlify](https://app.netlify.com)
3. Clique em "Add new site" > "Import an existing project"
4. Conecte seu repositório GitHub
5. Configure as variáveis de ambiente (SYNCPAY_CLIENT_ID e SYNCPAY_CLIENT_SECRET)
6. Clique em "Deploy site"

### Opção 2: Via Netlify CLI

1. Instale o Netlify CLI:
\`\`\`bash
npm install -g netlify-cli
\`\`\`

2. Faça login no Netlify:
\`\`\`bash
netlify login
\`\`\`

3. Inicialize o projeto:
\`\`\`bash
netlify init
\`\`\`

4. Configure as variáveis de ambiente:
\`\`\`bash
netlify env:set SYNCPAY_CLIENT_ID "seu_client_id"
netlify env:set SYNCPAY_CLIENT_SECRET "seu_client_secret"
\`\`\`

5. Faça o deploy:
\`\`\`bash
netlify deploy --prod
\`\`\`

## Tecnologias Utilizadas

- **Next.js 15.3.3** - Framework React
- **React 18.3.1** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3.4.1** - Estilização
- **Zod** - Validação de schemas
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Genkit AI** - Integração com Google AI
- **Firebase** - Backend e hosting
- **SyncPayments API** - Processamento de pagamentos PIX

## Funcionalidades

- Formulário de pagamento com validação
- Integração com API SyncPayments para pagamento PIX
- Página dedicada de pagamento PIX com QR Code
- Timer de contagem regressiva (10 minutos)
- Ofertas adicionais (upsell) - Revenda Sem Estoque e Fontes das Lojas
- Design responsivo com fonte Montserrat
- Componentes UI modernos (shadcn/ui)
- Suporte a Firebase App Hosting e Netlify

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento na porta 9002
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run typecheck` - Verifica os tipos TypeScript
- `npm run genkit:dev` - Inicia o Genkit em modo desenvolvimento
- `npm run genkit:watch` - Inicia o Genkit com watch mode

## Suporte

Para dúvidas ou problemas, entre em contato através do suporte.

---

© 2025 Cadastro De Franqueada. Todos os direitos reservados.
