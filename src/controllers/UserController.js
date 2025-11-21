import validator from "validator";

import { GetUserByIdUseCase } from "../use-cases/getUserById.js";
import { UpdateUserUseCase } from "../use-cases/updateUser.js";
import { CreateUserUseCase } from "../use-cases/createUser.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
  responseStatusError,
  responseStatusSuccess,
  columnsTableUsers,
} from "../helpers/http.js";

class UserController {
  async show(req, res) {
    try {
      const userId = req.params.userId;
      const isIdValid = validator.isUUID(userId);

      if (!isIdValid)
        return responseStatusError(res, 400, "The provider ID is not valid");

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);

      if (!user) return responseStatusError(res, 404, "User not found");

      return responseStatusSuccess(res, 200, user);
    } catch (e) {
      console.error(e);
      return responseStatusError(res, 500, "Internal server error.");
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.userId;
      const params = req.body;
      const isIdValid = validator.isUUID(userId);

      if (!isIdValid)
        return responseStatusError(res, 400, "The provider ID is not valid");

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);

      if (!user) return responseStatusError(res, 404, "User not found.");

      const requiredFields = columnsTableUsers;
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !requiredFields.includes(field),
      );

      if (someFieldIsNotAllowed)
        return responseStatusError(
          res,
          400,
          "Some provided field is not allowed",
        );

      if (params.password) {
        if (params.password.length < 6)
          return responseStatusError(
            res,
            400,
            "Password must be at least 6 characters",
          );
      }

      if (params.email) {
        if (!validator.isEmail(params.email))
          return responseStatusError(
            res,
            400,
            "Invalid e-mail. Please provide a valid one",
          );
      }

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(userId, params);

      return responseStatusSuccess(res, 200, updatedUser);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError)
        return responseStatusError(res, 400, e.message);

      console.error(e);
      return responseStatusError(res, 500, "Internal server error.");
    }
  }

  async store(req, res) {
    try {
      const params = req.body;
      const requiredFields = columnsTableUsers;

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0)
          return responseStatusError(res, 400, `Missing param: ${field}`);
      }

      if (params.password.length < 6)
        return responseStatusError(
          res,
          400,
          "Password must be at least 6 characters",
        );

      if (!validator.isEmail(params.email))
        return responseStatusError(
          res,
          400,
          "Invalid e-mail. Please provide a valid one",
        );

      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);

      return responseStatusSuccess(res, 201, createdUser);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError)
        return responseStatusError(res, 400, e.message);

      console.error(e);
      return responseStatusError(res, 500, "Internal server error");
    }
  }

  async delete() {}
}

export default new UserController();
