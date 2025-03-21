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
}