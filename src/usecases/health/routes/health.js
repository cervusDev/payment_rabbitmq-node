import express from 'express';

const healthRouter = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     description: Verifica se a API está funcionando corretamente
 *     responses:
 *       200:
 *         description: A API está funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 message:
 *                   type: string
 *                   example: "Servidor Express está funcionando!"
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                 timestamp:
 *                   type: string
 *                   example: "2025-03-18T12:34:56.789Z"
 */
healthRouter.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor Express está funcionando!',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };
