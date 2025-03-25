import { WalletService } from '../service/wallet_service.js';
import { ConnectRabbitMQExchange } from '../../../config/rabbitmq.js';

const queue = process.env.INSERT_VALUE_TO_WALLET;

export class SubscribeWalletQueue {
  constructor() {
    this.walletService = new WalletService();
    this.rabbitmq = new ConnectRabbitMQExchange();
  }

  async sub() {
    const { channel } = await this.rabbitmq.connect();
    
    channel.assertQueue(queue, { durable: false });
    console.log(`[*] Escutando a fila '${queue}'...`);
  
    channel.consume(queue, async (msg) => { 
      try {
        const { userId, amount, balanceType } = JSON.parse(msg.content.toString());
        await this.walletService.addMoney({ balanceType, userId, amount });
        
        console.log(`[x] Recebido na fila: '${msg.content.toString()}'`);
        channel.ack(msg);

      } catch (err) {
        throw new Error(err.message);
      };
    });
  };
};