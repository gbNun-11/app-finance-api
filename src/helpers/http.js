import validator from "validator";

export class GetUserHelper {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  columnsTableUsers() {
    return ["first_name", "last_name", "email", "password"];
  }

  columnsTableTransaction() {
    return ["user_id", "name", "date", "amount", "type"];
  }

  typesTransaction() {
    return ["EARNING", "EXPENSE", "INVESTMENT"];
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

  validationAmount(res, amount) {
    if (
      !validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
      })
    ) {
      this.responseStatusError(
        res,
        400,
        "The amount must be a valid currency.",
      );
      return false;
    }

    if (amount <= 0) {
      this.responseStatusError(res, 400, "The amount must be greater than 0.");
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

  validatRequiredFields(res, params, requiredFields) {
    for (const field of requiredFields) {
      const value = params[field];

      if (value === undefined || value === null) {
        this.responseStatusError(res, 400, `Missing param: ${field}`);
        return false;
      }

      if (typeof value === "string") {
        if (validator.isEmpty(value.trim())) {
          this.responseStatusError(res, 400, `Missing param: ${field}`);
          return false;
        }
      }

      if (typeof value === "number") {
        if (Number.isNaN(value)) {
          this.responseStatusError(res, 400, `Invalid numeric param: ${field}`);
          return false;
        }
      }
    }

    return true;
  }
}
