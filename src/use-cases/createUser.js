import crypto from "node:crypto";
import bcrypt from "bcrypt";

import { PostgresCreateUserRepository } from "../repositories/postgres/createUser.js";
import { PostgresGetUserByEmailReposity } from "../repositories/postgres/getUserByEmail.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailReposity();
    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userID = crypto.randomUUID();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      first_name: createUserParams.first_name,
      last_name: createUserParams.last_name,
      email: createUserParams.email,
      id: userID,
      password: hashedPassword,
    };

    const postgressCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgressCreateUserRepository.execute(user);

    return createdUser;
  }
}
