import { PublishWalletQueue } from '../queues/wallet_producer.js';
import { WalleRepository } from '../repository/wallet_repository.js';

export class WalletService {
  constructor() {
    this.walleRepository = new WalleRepository();
    this.walletQueue = new PublishWalletQueue();
  };

  async publishValueWallet({ userId, amount, balanceType }) {
    try {
      if (!['debit_balance', 'ticket_balance', 'credit_balance'].includes(balanceType)) {
        throw new Error('Tipo de saldo inválido!');
      }

      const { message } = await this.walletQueue.pub({ userId, amount, balanceType });
      return { message };
    } catch (err) {
      throw new Error('Erro ao enviar pedido de acrescimo na carteira!', err);
    }
  }

  async addMoney({ userId, balanceType, amount }) {
    try {
      const wallet = await this.walleRepository.findByUserId({ userId });

      if (!wallet) {
        throw new Error(`Carteira não encontrada para o usuário de id: ${userId}!`);
      }
      
      const balanceValue =  Number(amount) + Number(wallet[balanceType]);

      const { id, credit_balance, debit_balance } = await this.walleRepository.updateWallet({ userId, balanceType, balanceValue })

      if (!id) {
        throw new Error('Erro ao atualizar carteira!');
      };

      return {
        id, 
        debit_balance,
        credit_balance, 
      }

    } catch(err) {
      throw new Error(err.message);
    }
  }
}