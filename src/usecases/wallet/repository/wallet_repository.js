import { prisma } from '../../../config/prisma.js'

export const walleRepository = {
  findByUser: async ({ userId }) => {
    return await prisma.wallet.findUnique({ where: { userId } })
  }, 
  createWallet: async ({ userId }) => {
    return await prisma.wallet.create({ data: { userId } })
  },
  updateWallet: async ({ userId, balanceValue, balanceType }) => {
    return await prisma.wallet.update({
      where: { userId },
      data: {
        last_updated: new Date(),
        [balanceType]: balanceValue,
      }
    })
  }
}