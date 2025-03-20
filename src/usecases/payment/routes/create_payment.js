import express from "express";
import { authenticateToken } from '../../../config/token_jwt.js';
import { PaymentController } from '../controller/payment_controller.js';

const createPaymentRouter = express.Router();

createPaymentRouter.post('/payment/create', authenticateToken, (req, res) => {
  const walletController = new PaymentController();
  walletController.create(req, res);
})

export { createPaymentRouter };