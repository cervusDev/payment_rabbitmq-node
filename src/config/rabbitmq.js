import * as amqplib from 'amqplib';

export class ConnectRabbitMQExchange {
  constructor() {};

  async connect() {
    try {
      const connection = await amqplib.connect(process.env.RABBITMQ);
      const channel = await connection.createChannel();
    
      await channel.assertExchange(process.env.EXCHANGE, 'direct', { durable: false });
      return { channel };
    } catch (err) {
      throw new Error('Erro ao conectar no RabbitMQ');
    }
  }
}