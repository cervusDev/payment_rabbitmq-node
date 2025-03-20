import { stripe } from '../../../config/stripe.js';
import { prisma } from '../../../config/prisma.js';

export class PaymentService {
  constructor() {
    this.stripe = stripe.connect();
    this.prisma = prisma;
  };

  async createPaymentCredit({ amount, currency, payment_method }) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method,
      });

      const { status, stripeId, paymentMethod, ...res } = await this.prisma.payment.create({
        data: {
          amount,
          status: "pending",
          currency,
          stripeId: paymentIntent.id
        }
      });

      return {
        status, 
        stripeId, 
        paymentMethod,
        amount: res.amount, 
        currency: res.currency, 
      }
    } catch (err) {
      throw new Error("Erro ao processar pagamento.");
    };
  };

  async confirmPayment({ stripeId }) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(stripeId);

      if (paymentIntent.status === "succeeded") {
        return this.prisma.payment.update({ 
          where: { stripeId },
          data: { status: 'completed' }
        });
      } else {
        throw new Error("Pagamento não completado.");
      }
    } catch (err) {
      throw new Error("Pagamento não completado.");
    }
  };
}