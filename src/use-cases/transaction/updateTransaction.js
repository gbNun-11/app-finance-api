export class UpdateTransactionUseCase {
  constructor(postgresUpdateTransactionRepository) {
    this.postgresUpdateTransactionRepository =
      postgresUpdateTransactionRepository;
  }
  async execute(transactionId, params) {
    const updatedTransactions =
      await this.postgresUpdateTransactionRepository.execute(
        transactionId,
        params,
      );

    return updatedTransactions;
  }
}
