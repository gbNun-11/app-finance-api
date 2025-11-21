import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class UpdateUserUseCase {
  constructor(postgresGetUserByEmailReposity, postgresUpdateUserRepository) {
    this.postgresGetUserByEmailReposity = postgresGetUserByEmailReposity;
    this.postgresUpdateUserRepository = postgresUpdateUserRepository;
  }
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const userWithProvidedEmail =
        await this.postgresGetUserByEmailReposity.execute(
          updateUserParams.email,
        );

      console.log(userWithProvidedEmail);
      console.log(userId);

      if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const user = {
      ...updateUserParams,
    };

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.postgresUpdateUserRepository.execute(
      userId,
      user,
    );

    return updatedUser;
  }
}
