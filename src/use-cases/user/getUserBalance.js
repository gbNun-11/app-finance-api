export class GetUserBalanceUseCase {
  constructor(postgresGetUserBalanceRepository) {
    this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository;
  }

  async execute(userId) {
    const balanceUser =
      await this.postgresGetUserBalanceRepository.execute(userId);
    return balanceUser;
  }
}
