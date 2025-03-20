import express from 'express';
import { UserController } from '../controller/user_controller.js';

const createUserRouter = express.Router();

/**
 * @swagger
 * /create_user:
 *   post:
 *     description: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@mail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

createUserRouter.post('/create-user', (req, res) => {
  const userController = new UserController();
  userController.create(req, res);
});

export { createUserRouter };