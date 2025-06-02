# SAGAT AI - Sistema de Gestão Financeira

## 📌 Como Rodar o Projeto

### Pré-requisitos
- Node.js v16 ou superior
- npm ou yarn
- API backend rodando (conforme documentação separada)

### Passos para Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/front-vue-sagat-ai-test.git
cd front-vue-sagat-ai-test
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse o aplicativo em `http://localhost:5173`

## 🚀 Funcionalidades Implementadas
- **Autenticação**
  - Sistema de login com JWT
  - Registro de novos usuários
  - Proteção de rotas privadas
  - Gerenciamento de sessões
- **Dashboard Administrativo**
  - Visualização de contas bancárias
  - Gerenciamento de perfil de usuário
- **Transferências Bancárias**
  - Transferência entre contas (PIX e TED)
  - Validação de saldo disponível
  - Feedback visual sobre status da transferência
- **Extratos e Histórico**
  - Listagem de transações com scroll infinito
  - Filtros avançados (data, valor, tipo)
  - Detalhamento de cada transação
- **Internacionalização**
  - Suporte a múltiplos idiomas (Português-BR, Inglês)
  - Sistema de tokens para tradução
- **Notificações e Feedback**
  - Toasts para feedback ao usuário
  - Tratamento de erros e respostas da API
- **Página 404 Personalizada**
  - Tratamento adequado para rotas não existentes

## 🔌 Endpoints da API Utilizados
- **Autenticação**
  - `POST /auth/sign_up` - Registro de novos usuários
  - `PUT /auth/sign_in` - Login de usuários
  - `GET /users/infos` - Obter informações do usuário logado
- **Contas Bancárias**
  - `GET /users/bank_accounts/my` - Listar contas bancárias do usuário
  - `GET /users/bank_accounts` - Listar contas disponíveis para transferência
- **Transferências**
  - `POST /users/bank_account_transfers` - Realizar transferência entre contas
  - `GET /users/bank_account_transfers/statements` - Obter extratos com filtros

## 🔄 O Que Faria Diferente com Mais Tempo
Se tivesse mais tempo para o desenvolvimento, eu:

- Melhoraria o Design da Aplicação: Foquei muito em deixar tudo bem funcional, mas dediquei menos tempo ao aspecto visual. Isso ocorreu principalmente porque precisei me familiarizar com o ecossistema do Vue, já que normalmente trabalho com outras tecnologias.
- Implementaria Mais Testes: Adicionaria testes unitários e de integração para garantir a robustez da aplicação.
- Adicionaria Animações: Transições e animações para melhorar a experiência do usuário.
- Melhoraria a Performance: Otimizaria carregamentos e implementaria estratégias de cache.
- Expandiria as Funcionalidades:
  - Perfil de usuário completo
  - Configurações de conta
  - Histórico mais detalhado de transações
  - Dashboard com gráficos e estatísticas
- Aprimoraria a Segurança:
  - Implementação de refresh tokens
  - Proteção contra ataques CSRF
  - Validação mais robusta de formulários

Este projeto foi uma oportunidade excelente para explorar o desenvolvimento com Vue.js e Vuetify, além de implementar diversas funcionalidades comuns em aplicações financeiras modernas.