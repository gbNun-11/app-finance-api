export class TransactionController {
  constructor(
    getUserHelper,
    createTransactionUseCase,
    getTransactionByUserIdUseCase,
  ) {
    this.getUserHelper = getUserHelper;
    this.createTransactionUseCase = createTransactionUseCase;
    this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase;
  }
  async show(req, res) {
    try {
      const userId = req.query.userId;

      const user = await this.getUserHelper.validationUserId(res, userId);
      if (!user) return;

      const transactions = await this.getTransactionByUserIdUseCase.execute({
        userId,
      });
      return this.getUserHelper.responseStatusSuccess(res, 200, transactions);
    } catch (e) {
      console.error(e);
      return this.getUserHelper.responseStatusError(
        res,
        500,
        "Internal server error",
      );
    }
  }
  async store(req, res) {
    try {
      const params = req.body;
      const userId = params.user_id;

      const user = await this.getUserHelper.validationUserId(res, userId);
      if (!user) return;

      const requiredFields = this.getUserHelper.columnsTableTransaction();

      const validatFields = this.getUserHelper.validatRequiredFields(
        res,
        params,
        requiredFields,
      );
      if (!validatFields) return;

      const type = params.type.trim().toUpperCase();
      const typesTransaction = this.getUserHelper.typesTransaction();
      const typeIsValid = !typesTransaction.includes(type);

      if (typeIsValid) {
        return this.getUserHelper.responseStatusError(
          res,
          400,
          "The type must be EARNING, EXPENSE or INVESTMENT",
        );
      }

      const createdTransaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      });

      const isValidationAmount = this.getUserHelper.validationAmount(
        res,
        params.amount,
      );

      if (!isValidationAmount) return;

      return this.getUserHelper.responseStatusSuccess(
        res,
        201,
        createdTransaction,
      );
    } catch (e) {
      console.error(e);
      return this.getUserHelper.responseStatusError(
        res,
        500,
        "Internal server error",
      );
    }
  }
}
