import express from 'express';
import { AuthController } from '../controller/auth_controller.js';

const auhtRouter = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     description: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */


auhtRouter.post('/auth', (req, res) => {
  const authController = new AuthController();
  authController.login(req, res);
});

export { auhtRouter };