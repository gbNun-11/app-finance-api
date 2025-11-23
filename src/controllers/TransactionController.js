export class TransactionController {
  constructor(getUserHelper) {
    this.getUserHelper = getUserHelper;
  }
  async store(req, res) {
    const params = req.body;
    const userId = req.params.user_id;

    const user = await this.getUserHelper.validationUserId(res, userId);
    if (!user) return;

    console.log(params);
  }
}
