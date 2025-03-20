import Stripe from 'stripe';

class StripeConfig {
  constructor() {
    this.stripe = null;
  }

  async connect() {
    if (!this.stripe) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, 
      { apiVersion: '2025-02-24.acacia' });
    };

    return this.stripe;
  };
};

export const stripe = new StripeConfig()