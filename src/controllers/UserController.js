import { EmailAlreadyInUseError } from "../errors/user.js";

export class UserController {
  constructor(
    getUserHelper,
    updateUserUseCase,
    createUserUseCase,
    deleteUserUseCase,
  ) {
    this.getUserHelper = getUserHelper;
    this.updateUserUseCase = updateUserUseCase;
    this.createUserUseCase = createUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async show(req, res) {
    try {
      const userId = req.params.userId;

      const user = await this.getUserHelper.validationUserId(res, userId);
      if (!user) return;

      return this.getUserHelper.responseStatusSuccess(res, 200, user);
    } catch (e) {
      console.error(e);
      return this.getUserHelper.responseStatusError(
        res,
        500,
        "Internal server error.",
      );
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.userId;
      const params = req.body;

      const user = await this.getUserHelper.validationUserId(res, userId);
      if (!user) return;

      const requiredFields = this.getUserHelper.columnsTableUsers();
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !requiredFields.includes(field),
      );

      if (someFieldIsNotAllowed)
        return this.getUserHelper.responseStatusError(
          res,
          400,
          "Some provided field is not allowed",
        );

      if (params.password) {
        const isValidationPassword = this.getUserHelper.validationPassword(
          res,
          params.password,
        );
        if (!isValidationPassword) return;
      }

      if (params.email) {
        const isValidationEmail = this.getUserHelper.validationEmail(
          res,
          params.email,
        );
        if (!isValidationEmail) return;
      }

      const updatedUser = await this.updateUserUseCase.execute(userId, params);

      return this.getUserHelper.responseStatusSuccess(res, 200, updatedUser);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError)
        return this.getUserHelper.responseStatusError(res, 400, e.message);

      console.error(e);
      return this.getUserHelper.responseStatusError(
        res,
        500,
        "Internal server error.",
      );
    }
  }

  async store(req, res) {
    try {
      const params = req.body;
      const requiredFields = this.getUserHelper.columnsTableUsers();

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0)
          return this.getUserHelper.responseStatusError(
            res,
            400,
            `Missing param: ${field}`,
          );
      }

      const isValidationPassword = this.getUserHelper.validationPassword(
        res,
        params.password,
      );
      if (!isValidationPassword) return;

      const isValidationEmail = this.getUserHelper.validationEmail(
        res,
        params.email,
      );
      if (!isValidationEmail) return;

      const createdUser = await this.createUserUseCase.execute(params);

      return this.getUserHelper.responseStatusSuccess(res, 201, createdUser);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError)
        return this.getUserHelper.responseStatusError(res, 400, e.message);

      console.error(e);
      return this.getUserHelper.responseStatusError(
        res,
        500,
        "Internal server error",
      );
    }
  }

  async delete(req, res) {
    try {
      const userId = req.params.userId;

      const user = await this.getUserHelper.validationUserId(res, userId);
      if (!user) return;

      const deletedUser = await this.deleteUserUseCase.execute(userId);

      return this.getUserHelper.responseStatusSuccess(res, 200, deletedUser);
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
