export class TransactionController {
  constructor(getUserHelper, createTransactionUseCase) {
    this.getUserHelper = getUserHelper;
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async store(req, res) {
    try {
      const params = req.body;
      const userId = params.user_id;

      const user = await this.getUserHelper.validationUserId(res, userId);
      if (!user) return;

      const requiredFields = this.getUserHelper.columnsTableTransaction();

      for (const field of requiredFields) {
        if (!params[field] || params[field].toString().trim().length === 0)
          return this.getUserHelper.responseStatusError(
            res,
            400,
            `Missing param: ${field}`,
          );
      }

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
