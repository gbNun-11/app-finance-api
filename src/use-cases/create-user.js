import crypto from "node:crypto";
import bcrypt from "bcrypt";

import { PostgressCreateUserRepository } from "../repositories/postgres/create-user.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    // TODO: Verificar se o email já está em uso
    const userID = crypto.randomUUID();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userID,
      password: hashedPassword,
    };

    const postgressCreateUserRepository = new PostgressCreateUserRepository();
    const createdUser = await postgressCreateUserRepository.execute(user);

    return createdUser;
  }
}
