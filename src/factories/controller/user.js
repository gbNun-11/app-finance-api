// Repositorys
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/getUserById.js";
import { PostgresGetUserByEmailReposity } from "../../repositories/postgres/user/getUserByEmail.js";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/user/updateUser.js";
import { PostgresDeleteUserRepository } from "../../repositories/postgres/user/deleteUser.js";
import { PostgresCreateUserRepository } from "../../repositories/postgres/user/createUser.js";
// Use-Cases
import { GetUserByIdUseCase } from "../../use-cases/getUserById.js";
import { UpdateUserUseCase } from "../../use-cases/updateUser.js";
import { DeleteUserUseCase } from "../../use-cases/deleteUser.js";
import { CreateUserUseCase } from "../../use-cases/createUser.js";
// Helpers
import { GetUserHelper } from "../../helpers/http.js";
// Controllers
import { UserController } from "../../controllers/UserController.js";

export const makeGetController = () => {
  // Repositorys
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const postgresGetUserByEmailReposity = new PostgresGetUserByEmailReposity();
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
  const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
  const postgresCreateUserRepository = new PostgresCreateUserRepository();

  // Use-Cases
  const getUserByIdUseCase = new GetUserByIdUseCase(
    postgresGetUserByIdRepository,
  );
  const updateUserUseCase = new UpdateUserUseCase(
    postgresGetUserByEmailReposity,
    postgresUpdateUserRepository,
  );
  const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);
  const createUserUseCase = new CreateUserUseCase(
    postgresGetUserByEmailReposity,
    postgresCreateUserRepository,
  );

  // Helpers
  const getUserHelper = new GetUserHelper(getUserByIdUseCase);

  // Controllers
  const userController = new UserController(
    getUserHelper,
    updateUserUseCase,
    createUserUseCase,
    deleteUserUseCase,
  );

  return userController;
};
