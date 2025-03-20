# Projeto: Sistema de Processamento de Pagamentos

## Objetivo
Este projeto consiste na criação de uma API que gerencia o processamento de pagamentos. Ele inclui funcionalidades de autenticação, controle de status de pagamentos, e integração com RabbitMQ para processamento assíncrono. Além disso, será configurado um ambiente de desenvolvimento com Docker e integradas melhorias opcionais para aumentar a robustez e usabilidade da aplicação.

---

## Estrutura do Projeto

### 1. **Organização Modular**
A API será organizada utilizando o padrão **Controller-Service-Repository**, garantindo uma estrutura escalável e de fácil manutenção. A separação de responsabilidades facilita o desenvolvimento e a organização do código.

- **Controller**: Responsável por gerenciar as rotas e requisições HTTP.
- **Service**: Contém a lógica de negócios e manipulação dos dados.
- **Repository**: Interage diretamente com o banco de dados.

### 2. **Configuração de Variáveis de Ambiente**
Utilizar **dotenv** para carregar variáveis de ambiente de forma segura, como credenciais de banco de dados, chave do RabbitMQ, e outros parâmetros sensíveis.

### 3. **Middleware de Tratamento de Erros**
Implemente um **middleware de tratamento de erros globais**, que irá capturar e processar erros em qualquer ponto da aplicação, retornando mensagens de erro de maneira padronizada.

---

## Funcionalidades

### 1. **Autenticação e Cadastro de Usuários**
- Rota **/register** para cadastro de usuário com **email** e **senha**. A senha será armazenada de forma segura utilizando **bcrypt** para hash.
- Rota **/login** para autenticação, retornando um **token JWT**.
- Middleware JWT para proteção das rotas, como a de pagamento, garantindo que apenas usuários autenticados possam acessar recursos sensíveis.

### 2. **Banco de Dados (MySQL + Prisma)**
Utilizando **Prisma** como ORM para interação com o banco de dados **MySQL**. As tabelas necessárias são:

- **User**: 
  - Campos: `id`, `email`, `senha_hash`, `criado_em`, `atualizado_em`.
- **Payment**: 
  - Campos: `id`, `user_id`, `amount`, `status`, `created_at`, `updated_at`.
  - Status de pagamento: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`.

### 3. **Processamento de Pagamento com RabbitMQ**
- O usuário envia um **POST /payments** com o valor do pagamento.
- A API salva o pagamento no banco com status **PENDING** e envia uma mensagem para o **RabbitMQ**.
- Um consumidor RabbitMQ processa o pagamento e atualiza o status para **COMPLETED** ou **FAILED**.
- O usuário é notificado sobre o status do pagamento.

---

## Configuração do Ambiente

### Docker Setup
- **docker-compose.yml** contendo:
  - **MySQL**: Banco de dados.
  - **RabbitMQ**: Sistema de mensageria para o processamento assíncrono de pagamentos.
  - **Node.js API**: API para processar requisições.

- **.env**: Arquivo para configurar variáveis de ambiente, como credenciais e parâmetros de conexão.

---

## Melhorias Opcionais

### 1. **WebSocket ou Polling**
Implemente **WebSocket** ou **polling** para notificar os usuários em tempo real sobre o status de seus pagamentos.

### 2. **Logs Estruturados com Winston**
Utilize a biblioteca **Winston** para criar logs estruturados, facilitando o rastreamento de erros e a auditoria do sistema.

### 3. **Rate-Limiting**
Implemente **rate-limiting** para evitar abusos e proteger a API contra ataques de negação de serviço (DoS).

### 4. **Testes Unitários**
Desenvolva **testes unitários** para garantir que a lógica de processamento de pagamentos funcione corretamente e para garantir a qualidade do código.

---

## Tecnologias Utilizadas

- **Node.js**: Para desenvolvimento da API.
- **Prisma**: ORM para interação com o banco de dados.
- **JWT**: Para autenticação e segurança das rotas.
- **RabbitMQ**: Para mensageria e processamento assíncrono.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **Docker**: Para orquestrar o ambiente de desenvolvimento e produção.

---

## Como Executar o Projeto

1. Clone este repositório.
2. Crie um arquivo `.env` e configure as variáveis de ambiente, como credenciais do banco de dados e chave do RabbitMQ.
3. Execute o comando para iniciar os containers Docker:
   ```bash
   docker-compose up --build
"# payment_rabbitmq-node" 
