import { UpdateUserUseCase } from "../use-cases/updateUser.js";
import { CreateUserUseCase } from "../use-cases/createUser.js";
import { DeleteUserUseCase } from "../use-cases/deleteUser.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
  responseStatusError,
  responseStatusSuccess,
  columnsTableUsers,
  validationUserId,
  validationPassword,
  validationEmail,
} from "../helpers/http.js";

class UserController {
  async show(req, res) {
    try {
      const userId = req.params.userId;

      const user = await validationUserId(res, userId);
      if (!user) return;

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

      const user = await validationUserId(res, userId);
      if (!user) return;

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
        const isValidationPassword = validationPassword(res, params.password);
        if (!isValidationPassword) return;
      }

      if (params.email) {
        const isValidationEmail = validationEmail(res, params.email);
        if (!isValidationEmail) return;
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

      const isValidationPassword = validationPassword(res, params.password);
      if (!isValidationPassword) return;

      const isValidationEmail = validationEmail(res, params.email);
      if (!isValidationEmail) return;

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

  async delete(req, res) {
    try {
      const userId = req.params.userId;

      const user = await validationUserId(res, userId);
      if (!user) return;

      const deleteUserUseCase = new DeleteUserUseCase();
      const deletedUser = await deleteUserUseCase.execute(userId);

      return responseStatusSuccess(res, 200, deletedUser);
    } catch (e) {
      console.error(e);
      return responseStatusError(res, 500, "Internal server error");
    }
  }
}

export default new UserController();
