export class DeleteTransactionUseCase {
  constructor(postgresDeleteTransactionRepository) {
    this.postgresDeleteTransactionRepository =
      postgresDeleteTransactionRepository;
  }
  async execute(transactionId) {
    const deleteTransaction =
      await this.postgresDeleteTransactionRepository.execute(transactionId);

    return deleteTransaction;
  }
}
