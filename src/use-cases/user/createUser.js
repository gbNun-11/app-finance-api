import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
  constructor(postgresGetUserByEmailReposity, postgresCreateUserRepository) {
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailReposity;
    this.postgresCreateUserRepository = postgresCreateUserRepository;
  }
  async execute(createUserParams) {
    const userWithProvidedEmail =
      await this.postgresGetUserByEmailRepository.execute(
        createUserParams.email,
      );

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

    const createdUser = await this.postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
