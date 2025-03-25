import axios from 'axios';
import { IEmailRepository } from './email_repository_interface.js';

export class EmailRepository {
  constructor () {
    this.repository = new IEmailRepository();
  };

  async send({ email, name }) {
    try {
      const data = this.repository.WelcomeData({ name, email });
      axios.post(process.env.API_SEND_EMAIL, data);
    } catch (err) {
      throw new Error('erro ao enviar email:', err);
    };
  }

  async paymentSucced({   
    name,
    email,
    status,
    amount,
    stripeId,
    payment_method,
  }) {
    try {
      const data = this.repository.PaymentSuccedData({
        name,
        email,
        amount,
        status,
        stripeId,
        payment_method,
      });
      axios.post(process.env.API_SEND_EMAIL, data);
    } catch (err) {
      throw new Error('erro ao enviar email:', e);
    }
  }
}