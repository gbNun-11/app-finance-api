import crypto from "node:crypto";
import bcrypt from "bcrypt";

import { PostgressCreateUserRepository } from "../repositories/postgres/createUser.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    // TODO: Verificar se o email já está em uso
    const userID = crypto.randomUUID();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      first_name: createUserParams.first_name,
      last_name: createUserParams.last_name,
      email: createUserParams.email,
      id: userID,
      password: hashedPassword,
    };

    const postgressCreateUserRepository = new PostgressCreateUserRepository();
    const createdUser = await postgressCreateUserRepository.execute(user);

    return createdUser;
  }
}
