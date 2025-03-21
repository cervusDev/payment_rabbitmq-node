import express from "express";
import { authenticateToken } from '../../../config/token_jwt.js';
import { PaymentController } from '../controller/payment_controller.js';

const createPaymentRouter = express.Router();

/**
 * @swagger
 * /payment/create:
 *   post:
 *     description: Adicionar valor a carteira do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: Int
 *                 example: "1"
 *               amount:
 *                 type: Float
 *                 example: 100.00
 *               currency:
 *                 type: String
 *                 example: R$
 *               payment_method:
 *                 type: String[]
 *                 example: ['card']
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
createPaymentRouter.post('/payment/create', authenticateToken, (req, res) => {
  const walletController = new PaymentController();
  walletController.create(req, res);
})

export { createPaymentRouter };