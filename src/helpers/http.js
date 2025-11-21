import validator from "validator";
import { GetUserByIdUseCase } from "../use-cases/getUserById.js";

export const columnsTableUsers = [
  "first_name",
  "last_name",
  "email",
  "password",
];

export const responseStatusError = (res, code, text) => {
  return res.status(code).json({
    errorMessage: text,
  });
};

export const responseStatusSuccess = (res, code, text) => {
  return res.status(code).json(text);
};

export const validationUserId = async (res, userId) => {
  const isIdValid = validator.isUUID(userId);

  if (!isIdValid)
    return responseStatusError(res, 400, "The provider ID is not valid");

  const getUserByIdUseCase = new GetUserByIdUseCase();
  const user = await getUserByIdUseCase.execute(userId);

  if (!user) return responseStatusError(res, 404, "User not found.");

  return user;
};

export const validationPassword = (res, password) => {
  if (password.length < 6) {
    responseStatusError(res, 400, "Password must be at least 6 characters");
    return false;
  }

  return true;
};

export const validationEmail = (res, email) => {
  if (!validator.isEmail(email)) {
    responseStatusError(res, 400, "Invalid e-mail. Please provide a valid one");
    return false;
  }

  return true;
};
