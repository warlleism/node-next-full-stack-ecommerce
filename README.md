# NEXT ECOMMERCE

Este é um projeto de uma ecommerce fullstack!

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Requisitos](#requisitos)

## Visão Geral

Aqui você pode detalhar mais sobre seu projeto, incluindo os principais recursos e funcionalidades. Se possível, inclua capturas de tela ou GIFs do projeto em ação.

## Tecnologias Utilizadas

Liste as principais tecnologias e frameworks utilizados no projeto.

- Frontend:
  - [Nextjs](https://nextjs.org/)
  - [Zustand](https://github.com/pmndrs/zustand)
  - [NextAuth](https://next-auth.js.org/)

- Backend:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [TypeOrm](https://typeorm.io/)

- Outros:
  - [Jest](https://jestjs.io/)

## Instalação

Instruções sobre como configurar o ambiente de desenvolvimento local.

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-projeto.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd nome-do-projeto
    ```
3. Instale as dependências do backend:
    ```bash
    cd backend
    npm install
    ```
4. Instale as dependências do frontend:
    ```bash
    cd ../frontend
    npm install
    ```

## Uso

Instruções para rodar o projeto em ambiente de desenvolvimento.

1. Configurar .env:
    ```bash
    crie um arquivo .env
    copie os dados em example.env e cole em .env
    configure o nome do seu banco de dados (DB_NAME)
    configure a porta do seu banco de dados (DB_PORT) - opcional
    configure a senha do seu banco de dados (DB_PASS)
    ```

1. Execute as migrations:
    ```bash
    cd backend
    migration:generate
    migration:run
    ```

1. Inicie o servidor backend:
    ```bash
    cd backend
    npm run dev
    ```

2. Inicie o servidor frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```

O projeto backend estará disponível em `http://localhost:3001` (ou na porta configurada).

## Requisitos

### Coleta de Requisitos do projeto

#### Requisitos Funcionais

1. **Cadastro e Autenticação de Usuários**
   - Cadastro de novos usuários com validação de dados.
   - Login de usuários com verificação de credenciais.
   - Autenticação usando tokens JWT.

2. **Gestão de Produtos**
   - CRUD de produtos (Criar, Ler, Atualizar, Deletar).
   - Listagem de todos os produtos com opção de filtro para ordenar de forma crescente e decrescente.
   - Exibição de produtos em promoção.
   - Marcar e desmarcar produtos como favoritos.
   - Adicionar e remover produtos no carrinho.

3. **Carrinho de Compras**
   - Adicionar e remover produtos no carrinho.
   - Atualizar quantidade de produtos no carrinho.
   - Cálculo do total do carrinho.

4. **Interface do Usuário**
   - Homepage com carrossel de imagens para exibir produtos.
   - Formulários para login, registro, e gerenciamento de produtos com validação de dados.
   - Páginas de listagem de produtos com filtros e buscas.
   - Páginas de detalhe do produto.
   - Páginas de detalhar todos produtos.
   - Cabeçalho com logotipo, input de search, botões de login, register e logout.
   - Card de produto com imagem, titulo, categoria, preço, preço calculado com a promoção, porcentagem de promoção, botão de carrinho e de favoritar.

5. **Integração e Cache de Dados**
   - Uso do React Query para manter os dados atualizados e gerenciar o cache.

#### Requisitos Não Funcionais

1. **Performance**
   - Aplicação deve ser responsiva e rápida, com tempos de carregamento mínimos.
   - Utilização de técnicas de otimização de imagem no carrossel.

2. **Segurança**
   - Implementação de autenticação segura com JWT.
   - Criptografia de senhas dos usuários.
   - Validação rigorosa de dados nos formulários para prevenir ataques de injeção.

3. **Escalabilidade**
   - Arquitetura da aplicação deve suportar crescimento do número de usuários e produtos.
   - Estrutura modular do código para facilitar manutenção e expansão.
   - Aplicação dos principios do SOLID para responsibilidades únicas.
   - DRY para evitar duplicação de código.

4. **Usabilidade**
   - Interface intuitiva e amigável para o usuário.
   - Formulários e interações devem ser claros e de fácil utilização.
   - Acessibilidade para garantir que todos os usuários possam utilizar a aplicação.

5. **Manutenibilidade**
   - Código deve ser bem documentado e seguir boas práticas de programação.
   - Utilização de TypeScript para aumentar a segurança e clareza do código.
   - Testes automatizados para garantir a funcionalidade e evitar regressões.

### Tecnologias Necessárias

#### Frontend

- **Next.ts**: Estrutura da aplicação.
- **Next Auth**: Autenticação de usuário.
- **TypeScript/tsx**: Linguagem de programação para desenvolvimento.
- **React Query**: Gerenciamento de estado e cache de dados.
- **React Hook Form**: Validação e gerenciamento de formulários.
- **SCSS**: Estilização da aplicação.
- **Fetch API**: Realização de requisições HTTP.
- **MUI**: Ferramentas de interface de usuário gratuitas para ajudar no desenvolvimento.

#### Backend

- **Node.js**: Ambiente de execução do JavaScript no servidor. 
- **TypeScript**: Linguagem de programação para desenvolvimento.
- **TypeOrm**: Orm para trabalhar com typescript. (facilita a interação entre a aplicação e bancos de dados relacionais)
- **Express**: Framework para criação das rotas e middleware.
- **Nodemon**: Reinicia automaticamente o aplicativo quando alterações são feitar.
- **postgresql**: Banco de dados para permanencia de dados (postgresql).
- **bcrypt**: Criptografia de senhas.
- **jsonwebtoken**: Geração e verificação de tokens JWT.
- **Jest ou Mocha**: Ferramentas para testes automatizados.

### Próximos Passos

1. **Planejamento Detalhado**
   - Criação de wireframes e protótipos para as páginas principais.
   - Detalhamento de fluxos de usuário.
   - Design de páginas e componentes

2. **Setup Inicial**
   - Configuração do ambiente de desenvolvimento.
   - Estruturação inicial do projeto frontend e backend.

3. **Desenvolvimento Incremental**
   - Implementação de funcionalidades principais de forma incremental.
   - Testes e validações contínuas durante o desenvolvimento.

4. **Testes e Depuração**
   - Testes automatizados e manuais para garantir a qualidade do código.
   - Correção de bugs e ajustes de performance.

5. **Deploy e Monitoramento**
   - Deploy da aplicação em ambiente de produção.
   - Monitoramento e manutenção contínua para garantir a estabilidade e performance da aplicação.


