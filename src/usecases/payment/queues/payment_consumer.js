import { PaymentService } from '../service/payment_service.js';
import { ConnectRabbitMQExchange } from '../../../config/rabbitmq.js';

const queue = process.env.PAYMENT_QUEUE;

export class SubscribePaymentQueue {
  constructor() {
    this.paymentService = new PaymentService();
    this.rabbitmq = new ConnectRabbitMQExchange();
  };

  async sub() {
    const { channel } = await this.rabbitmq.connect();
    
    channel.assertQueue(queue, { durable: fasle });
    console.log(`[*] Escutando a fila '${queue}'...`);

    channel.consume(queue, async (msg) => {
      try {
        const { stripeId } = JSON.parse(msg.content.toString());
        
        await this.paymentService.confirmPayment({ stripeId });

        console.log(`[x] Recebido na fila: '${msg.content.toString()}'`);
        channel.ack(msg);
      } catch(err) {
        throw new Error('Erro ao receber o pagamento!');
      }
    });
  };
  
}