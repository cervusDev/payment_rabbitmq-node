import { prisma } from '../../../config/prisma.js';

export class PaymentRepository {
  constructor () {
    this.prisma = prisma;
  };

  async createPayment({ data }) {
    return this.prisma.payment.create({ data });
  };

  async updatePaymentStatus({ stripeId, status }) {
    return this.prisma.payment.update({
      where: { stripeId },
      data: { status }
    });
  };

  async getPaymentByStripeId({ stripeId }) {
    return this.prisma.payment.findUnique({ where: { stripeId } });
  };
};