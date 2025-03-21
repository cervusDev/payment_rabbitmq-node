import Stripe from 'stripe';

export class StripeConfig {
  constructor() {
    this.stripe = null;
  }

  async connect() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,
    { apiVersion: '2025-02-24.acacia' });

    return { stripe }
  };

  async paymentIntentsCredit({ amount, currency, payment_method }) {
    try {
      const { stripe } = await this.connect();
  
      if (!stripe) {
        throw new Error('Não foi possível conectar o stripe.')
      }
  
      const { id } = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method,
        payment_method_types: ['card'],
      });
  
      return { id };
    } catch(err) {
      throw new Error(err.message)
    }
  };

  async paymentIntentsRetrive({ stripeId }) {
    try {
      const { stripe } = await this.connect();
      const { status } = await stripe.paymentIntents.retrieve(stripeId);
  
      return { status };
    } catch(err) {
      throw new Error(err.message)
    }
  }
};
