import { ConnectRabbitMQExchange } from '../../../config/rabbitmq.js';

const queue = process.env.PAYMENT_QUEUE;

export class PublishPaymentQueue {
  constructor() {
    this.rabbitmq = new ConnectRabbitMQExchange();
  };

  async pub({ status, stripeId, payment_method, amount, currency }) {
    try {
      const { channel } = await this.rabbitmq.connect();
  
      channel.assertQueue(queue, { durable: false });
      
      return channel.sendToQueue(queue, Buffer.from(
        JSON.stringify({ status, stripeId, payment_method, amount, currency })
      ));
    } catch (err) {
      throw new Error(err.message)
    }
  };
}