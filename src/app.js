// GENERAL IMPORTS
import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

// SWAGGER IMPORT
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './config/swagger.js';

// ROUTES IMPORTS
import { healthRouter } from './routes/health.js';
import { auhtRouter } from './usecases/auth/routes/auth.js';
import { createUserRouter } from './usecases/user/routes/create_user.js';
import { addValueToWalletRouter } from './usecases/wallet/routes/add_money.js';
import { createPaymentRouter } from './usecases/payment/routes/create_payment.js';

// CONSUMER QUEUES IMPORTS
import { SubscribeWalletQueue } from './usecases/wallet/queues/wallet_consumer.js';
import { SubscribePaymentQueue } from './usecases/payment/queues/payment_consumer.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// SWAGGER CONFIG
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// INTEGRATION ROUTES/EXPRESS
app.use(auhtRouter);
app.use(healthRouter);
app.use(createUserRouter);
app.use(createPaymentRouter);
app.use(addValueToWalletRouter);

const startServer = async () => {
  try {
    //INITIALIZE CONSUMER QUEUES
    new SubscribeWalletQueue();
    new SubscribePaymentQueue();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    throw new Error('Erro ao iniciar o servidor', err);
  }
};

startServer();