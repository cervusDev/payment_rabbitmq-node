import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './config/swagger.js';
import { auhtRouter } from './routes/auth.js';
import { healthRouter } from './routes/health.js';
import { userRouter } from './routes/create_user.js';
import { addMoneyRouter } from './routes/add_money.js';
import { SubscribehValueToWalletQueue } from './usecases/wallet/queues/wallet_consumer.js';

dotenv.config();
const app = express();

// Configuração que lê JSON no corpo da requisição
app.use(bodyParser.json());

// Configuração do Swagger
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Integração das rotas na aplicação express
app.use(auhtRouter);
app.use(userRouter);
app.use(healthRouter);
app.use(addMoneyRouter);

const startServer = async () => {
  try {
    // Inicializando a escuta da fila de acrescimo do valor na carteira
    new SubscribehValueToWalletQueue();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    throw new Error('Erro ao iniciar o servidor', err);
  }
};

startServer();