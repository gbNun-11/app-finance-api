import validator from "validator";

import { CreateUserUseCase } from "../use-cases/createUser.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

class CreateUserController {
  async execute(req, res) {
    try {
      const params = req.body;
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return res.status(400).json({
            errorMessage: `Missing param: ${field}`,
          });
        }
      }

      if (params.password.length < 6) {
        return res.status(400).json({
          errorMessage: "Password must be at least 6 characters",
        });
      }

      if (!validator.isEmail(params.email)) {
        return res.status(400).json({
          errorMessage: "Invalid e-mail. Please provide a valid one",
        });
      }

      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);

      return res.status(201).json(createdUser);
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

export default new CreateUserController();
