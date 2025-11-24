// Repositorys
import {
  PostgresCreateUserRepository,
  PostgresDeleteUserRepository,
  PostgresUpdateUserRepository,
  PostgresGetUserByEmailReposity,
  PostgresGetUserByIdRepository,
  // PostgresGetUserBalanceRepository,
} from "../../repositories/postgres/index.js";
// Use-Cases
import {
  GetUserByIdUseCase,
  CreateUserUseCase,
  DeleteUserUseCase,
  UpdateUserUseCase,
} from "../../use-cases/index.js";
// Helpers
import { GetUserHelper } from "../../helpers/http.js";
// Controllers
import { UserController } from "../../controllers/UserController.js";

export const makeGetUserController = () => {
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
  // const postgresGetUserBalanceRepository =
  //   new PostgresGetUserBalanceRepository();

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
