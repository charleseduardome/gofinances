import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomeSum = transactions.reduce((total, transaction) => {
      const { value } = transaction;

      return transaction.type === 'income' ? total + value : total;
    }, 0);

    const outcomeSum = transactions.reduce((total, transaction) => {
      const { value } = transaction;

      return transaction.type === 'outcome' ? total + value : total;
    }, 0);

    const total = incomeSum - outcomeSum;

    const balance: Balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
