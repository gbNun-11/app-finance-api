import validator from "validator";

export class GetUserHelper {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  columnsTableUsers() {
    return ["first_name", "last_name", "email", "password"];
  }

  responseStatusError = (res, code, text) => {
    return res.status(code).json({
      errorMessage: text,
    });
  };

  responseStatusSuccess(res, code, text) {
    return res.status(code).json(text);
  }

  validationEmail(res, email) {
    if (!validator.isEmail(email)) {
      this.responseStatusError(
        res,
        400,
        "Invalid e-mail. Please provide a valid one",
      );
      return false;
    }

    return true;
  }

  validationPassword(res, password) {
    if (password.length < 6) {
      this.responseStatusError(
        res,
        400,
        "Password must be at least 6 characters",
      );
      return false;
    }

    return true;
  }

  async validationUserId(res, userId) {
    const isIdValid = validator.isUUID(userId);

    if (!isIdValid) {
      this.responseStatusError(res, 400, "The provider ID is not valid");
      return false;
    }

    const user = await this.getUserByIdUseCase.execute(userId);

    if (!user) {
      this.responseStatusError(res, 404, "User not found.");
      return false;
    }

    return user;
  }
}
