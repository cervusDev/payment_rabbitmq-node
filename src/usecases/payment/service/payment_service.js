import { StripeConfig } from '../../../config/stripe.js';
import { ValidatorRules } from '../rules/payment_rules.js';
import { sendMessageToPaymentSucced } from '../../../config/emailjs.js';
import { PaymentRepository } from '../repository/payment_repository.js';
import { UserRepository } from '../../user/repository/user_repository.js';
import { WalleRepository } from '../../wallet/repository/wallet_repository.js';

export class PaymentService {
  constructor() {
    this.stripe = new StripeConfig();
    this.userRepository = new UserRepository();
    this.validatorRules = new ValidatorRules();
    this.walleRepository = new WalleRepository();
    this.paymentRepository = new PaymentRepository();
  };

  async createPaymentCredit({ amount, currency, payment_method, userId }) {
    try {
      const wallet = await this.walleRepository.findByUserId({ userId });

      if (!this.validatorRules.verifyCreditsInWallet({ credit_balance: wallet.credit_balance, amount })) {
        throw new Error('Você não tem créditos suficientes no cartão.');
      }

      const { id } = await this.stripe.paymentIntentsCredit({
        amount,
        currency,
        payment_method,
      });
      
      const data = {
        userId,
        amount,
        currency,
        stripeId: id,
        status: "pending",
        paymentMethod: 'credit',
      };

      const { status, stripeId, paymentMethod, ...res } = await this.paymentRepository.createPayment({ data })

      return {
        status, 
        stripeId, 
        paymentMethod,
        amount: res.amount, 
        currency: res.currency, 
      }
    } catch (err) {
      throw new Error(err);
    };
  };

  async confirmPayment({ stripeId }) {
    try {
      if (!stripeId) {
        throw new Error("Não existe um id para a transação do stripe.")
      }

      const { status } = await this.stripe.paymentIntentsRetrive(stripeId);
      
      if (!this.validatorRules.verifyTransactionStatus({ status })) {
        throw new Error('Transação não foi atualizado.');
      }

      const paymentUpdated = await this.paymentRepository.updatePaymentStatusSucced({ stripeId })
      
      if (!paymentUpdated) {
        throw new Error('Pagamento não foi atualizado');
      }
      
      const user = await this.userRepository.findByUserId({ id: paymentUpdated.userId })

      if (!user) {
        throw new Error("Usuário não encontrado para efetuar o pagamento");
      }

      sendMessageToPaymentSucced({
        stripeId,
        name: user.name,
        email: user.email,
        status: paymentUpdated.status,
        amount: paymentUpdated.amount,
        payment_method: paymentUpdated.paymentMethod,
      })
    } catch (err) {
      throw new Error("Pagamento não completado.");
    }
  };
}