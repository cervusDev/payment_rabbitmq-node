import express from "express";
import { authenticateToken } from '../config/token_jwt.js';
import { WalletController } from '../usecases/wallet/controller/wallet_controller.js';

const addMoneyRouter = express.Router();

/**
 * @swagger
 * /wallet/add_money:
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
 *               balanceType:
 *                 type: Array['debit_balance', 'ticket_balance', 'credit_balance']
 *                 example: "debit_balance"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
addMoneyRouter.post('/wallet/add_money', authenticateToken, (req, res) => {
  const walletController = new WalletController();
  walletController.addMoney(req, res);
})

export { addMoneyRouter };
