import { WalletService } from '../service/wallet_service.js';

export class WalletController {
  constructor() {
    this.walletService = new WalletService();
  };

  async createOrder(req, res) {
    try {
      const { amount, balanceType, userId } = req.body;
      const data = await this.walletService.orderToInsertValue({ amount, balanceType, userId });
      res.status(200).json(data)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}