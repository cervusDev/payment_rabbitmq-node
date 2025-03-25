import { prisma } from '../../../config/prisma.js'

export class WalleRepository {
  constructor() {
    this.prisma = prisma;
  };

  async findByUserId({ userId }) {
    try {
      return await this.prisma.wallet.findUnique({ where: { userId } });
    } catch(err) {
      throw new Error(err.message)
    } 
  };

  async createWallet({ userId }) {
    try {
      const create = await this.prisma.wallet.create({ data: { userId } });
      return create;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  async updateWallet({ userId, balanceValue, balanceType }) {
    return await this.prisma.wallet.update({
      where: { userId },
      data: {
        last_updated: new Date(),
        [balanceType]: balanceValue
      }
    });
  };
};