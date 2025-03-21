import { prisma } from '../../../config/prisma.js';

export class PaymentRepository {
  constructor () {
    this.prisma = prisma;
  };

  async createPayment({ data }) {
    return this.prisma.payment.create({ data });
  };

  async updatePaymentStatusSucced({ stripeId }) {
    return this.prisma.payment.update({
      where: { stripeId },
      data: { status: 'completed' }
    });
  };
};