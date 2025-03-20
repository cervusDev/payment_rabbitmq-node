import express from 'express';
import { UserController } from '../usecases/user/controller/user_controller.js';

const userRouter = express.Router();

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

userRouter.post('/create-user', (req, res) => {
  const userController = new UserController();
  userController.create(req, res);
});

export { userRouter };