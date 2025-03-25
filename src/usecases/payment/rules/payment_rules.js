export class ValidatorRules {
  constructor() {};

  async verifyCreditsInWallet({ credit_balance, amount }) {
    if (credit_balance < amount) {
      return false;
    } else {
      return true;
    }
  }

  async verifyTransactionStatus({ status }) {
    if (status === "requires_confirmation") {
      return true;
    } else {
      return false;
    }
  }

  async substracionWalletValueToDebit({ debit_balance, amount }) {
    if (!debit_balance && amount) {
      return {
        sub_status: false,
        value: ''
      };
    } else {
      return {
        sub_status: true,
        value: debit_balance - amount
      }
    }
  }
}