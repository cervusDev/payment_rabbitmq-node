import { EmailRepository } from '../repository/email_repository.js';

export class EmailService {
  constructor() {
    this.emailRepository = new EmailRepository();
  };

  async sendWelcomeEmail({ name, email }) {
    return await this.emailRepository.send({ email, name })
  }

  async sendMessageToPaymentSucced({   
    name,
    email,
    status,
    amount,
    stripeId,
    payment_method,
  }) {
    return await this.emailRepository.paymentSucced({ amount, email, name, payment_method, status, stripeId });
  }
}