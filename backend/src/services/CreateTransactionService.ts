import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);
    const transationRepository = getCustomRepository(TransactionRepository);

    if (type === 'outcome') {
      const { total } = await transationRepository.getBalance();
      if (value > total) {
        throw new AppError('Insufficient balance');
      }
    }

    let checkCategoryExists = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExists) {
      checkCategoryExists = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(checkCategoryExists);
    }

    const transaction = transationRepository.create({
      title,
      value,
      type,
      category: checkCategoryExists,
    });

    await transationRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
