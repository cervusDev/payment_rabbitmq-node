import { ConnectRabbitMQExchange } from '../../../config/rabbitmq.js';

const queue = process.env.INSERT_VALUE_TO_WALLET;

export class PublishWalletQueue {
  constructor() {
    this.rabbitmq = new ConnectRabbitMQExchange();
  };

  async pub({ userId, amount, balanceType }) {
    const { channel } = await this.rabbitmq.connect();

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId, amount, balanceType })));
  
    return { message: `Pedido para atualizar saldo na carteira foi enviado com sucesso!` };
  };
};