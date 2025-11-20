import { GetUserByIdUseCase } from "../use-cases/getUserById.js";
import validator from "validator";

class GetUserByIdController {
  async execute(req, res) {
    try {
      const isIdValid = validator.isUUID(req.params.userId);

      if (!isIdValid) {
        return res.status(400).json({
          errorMessage: "The provided id is not valid",
        });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(req.params.userId);

      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        errorMessage: "Internal server error",
      });
    }
  }
}

export default new GetUserByIdController();
