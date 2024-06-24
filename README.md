# NEXT ECOMMERCE

Este é um projeto de uma ecommerce fullstack!

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)

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


