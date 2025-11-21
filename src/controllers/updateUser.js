import validator from "validator";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { GetUserByIdUseCase } from "../use-cases/getUserById.js";
import { UpdateUserUseCase } from "../use-cases/createUser.js";

class UpdateUserController {
  async execute(req, res) {
    try {
      const updateUserParams = req.body;
      const isIdValid = validator.isUUID(req.params.userId);

      if (!isIdValid) {
        return res.status(400).json({
          errorMessage: "The provided ID is not valid",
        });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(req.params.userId);

      if (!user) {
        return res.status(404).json({
          errorMessage: "User not found.",
        });
      }

      const requiredFields = ["first_name", "last_name", "email", "password"];
      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !requiredFields.includes(field),
      );

      if (!someFieldIsNotAllowed) {
        return res.status(400).json({
          errorMessage: "Some provided field is not allowed",
        });
      }

      if (updateUserParams.password) {
        if (updateUserParams.password.length < 6) {
          return res.status(400).json({
            errorMessage: "Password must be at least 6 characters",
          });
        }
      }

      if (updateUserParams.email) {
        if (!validator.isEmail(updateUserParams.email)) {
          return res.status(400).json({
            errorMessage: "Invalid e-mail. Please provide a valid one",
          });
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(
        user,
        updateUserParams,
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        return res.status(400).json({
          errorMessage: e.message,
        });
      }

      console.error(e);
      return res.status(500).json({
        errorMessage: "Internal server error",
      });
    }
  }
}

export default new UpdateUserController();
