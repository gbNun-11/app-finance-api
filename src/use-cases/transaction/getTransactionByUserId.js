export class GetTransactionByUserIdUseCase {
  constructor(postgresGetTransactionByUserIdRepository) {
    this.postgresGetTransactionByUserIdRepository =
      postgresGetTransactionByUserIdRepository;
  }
  async execute(params) {
    const transactions =
      await this.postgresGetTransactionByUserIdRepository.execute(
        params.userId,
      );

    return transactions;
  }
}
