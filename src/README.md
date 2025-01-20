# SENTINNELL IA WORKSPACE - SIAW

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build the project for production:
   ```bash
   npm run build
   ```

## Instalação

1. Clone o repositório:

    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd SENTINNELLIAWORKSPACE
    ```

2. Instale as dependências:

    ```sh
    npm run install-deps
    ```

## Executando o Frontend

1. Inicie o servidor de desenvolvimento do frontend:

    ```sh
    npm start
    ```

2. O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

## Executando o Backend

1. Abra um novo terminal e navegue até o diretório do projeto:

    ```sh
    cd SENTINNELLIAWORKSPACE
    ```

2. Inicie o servidor backend:

    ```sh
    node server.js
    ```

3. O backend estará disponível em [http://localhost:4000](http://localhost:4000).

## Estrutura do Projeto

- `src/`: Contém o código fonte do frontend React.
- `server.js`: Servidor backend usando Express.
- `package.json`: Configurações e dependências do projeto.

## Rotas

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:4000/api/projects](http://localhost:4000/api/projects)

## Notas

- Certifique-se de que o backend está rodando antes de acessar o frontend para garantir que as requisições API funcionem corretamente.
- O frontend está configurado para usar um proxy para redirecionar as requisições API para o backend.
