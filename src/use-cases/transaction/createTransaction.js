import crypto from "node:crypto";

export class CreateTransactionUseCase {
  constructor(postgresCreateTransactionRepository) {
    this.postgresCreateTransactionRepository =
      postgresCreateTransactionRepository;
  }
  async execute(createTransactionParams) {
    const transactionId = crypto.randomUUID();
    const transaction = await this.postgresCreateTransactionRepository.execute({
      ...createTransactionParams,
      id: transactionId,
    });

    return transaction;
  }
}
