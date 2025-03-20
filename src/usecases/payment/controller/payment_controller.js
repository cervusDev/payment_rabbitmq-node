import { PaymentService } from '../service/payment_service.js';
import { PublishPaymentQueue } from '../queues/payment_producer.js';

export class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
    this.paymentQueue = new PublishPaymentQueue();
  };

  async create(req, res) {
    try {
      const { amount, currency, payment_method } = req.body;
  
      const payment = await this.paymentService.createPaymentCredit({ amount, currency, payment_method })
  
      if (payment.status) {
        await this.paymentQueue.pub({  
          amount: payment.amount,
          status: payment.status,
          currency: payment.currency,
          stripeId: payment.stripeId,
          payment_method: payment_method,
        });
      };

      res.status(200).json({ success: true, message: 'Pagamento enviado com sucesso.' });
    } catch (err) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}