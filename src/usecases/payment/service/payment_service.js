import { StripeConfig } from '../../../config/stripe.js';
import { sendMessageToPaymentSucced } from '../../../config/emailjs.js';
import { PaymentRepository } from '../repository/payment_repository.js';
import { UserRepository } from '../../user/repository/user_repository.js';

export class PaymentService {
  constructor() {
    this.stripe = new StripeConfig();
    this.userRepository = new UserRepository();
    this.paymentRepository = new PaymentRepository();
  };

  async createPaymentCredit({ amount, currency, payment_method, userId }) {
    try {
      const { stripe } = await this.stripe.connect()

      const { id } = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method,
        payment_method_types: ['card'],
      });
      
      const data = {
        userId,
        amount,
        currency,
        stripeId: id,
        status: "pending",
        paymentMethod: 'credit',
      };

      const { status, stripeId, paymentMethod, ...res } = await this.paymentRepository.createPayment({ data })

      return {
        status, 
        stripeId, 
        paymentMethod,
        amount: res.amount, 
        currency: res.currency, 
      }
    } catch (err) {
      throw new Error(err);
    };
  };

  async confirmPayment({ stripeId }) {
    try {
      const { stripe } = await this.stripe.connect();
      const paymentIntent = await stripe.paymentIntents.retrieve(stripeId);
      
      if (paymentIntent.status === "requires_confirmation") {
        const paymentUpdated = await this.paymentRepository.updatePaymentStatusSucced({ stripeId })
        
        const user = await this.userRepository.findByUserId({ id: paymentUpdated.userId })

        if (!user) {
          throw new Error("Usuário não encontrado para efetuar o pagamento");
        }

        if (!paymentUpdated) {
          throw new Error('Pagamento não foi atualizado');
        }

        sendMessageToPaymentSucced({
          stripeId,
          name: user.name,
          email: user.email,
          status: paymentUpdated.status,
          amount: paymentUpdated.amount,
          payment_method: paymentUpdated.paymentMethod,
        })
      } else {
        throw new Error("Pagamento não completado.");
      }
    } catch (err) {
      throw new Error("Pagamento não completado.");
    }
  };
}