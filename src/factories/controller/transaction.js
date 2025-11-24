// Repositorys
import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresGetTransactionByUserIdRepository,
} from "../../repositories/postgres/index.js";
// Use-Cases
import {
  GetUserByIdUseCase,
  CreateTransactionUseCase,
  GetTransactionByUserIdUseCase,
} from "../../use-cases/index.js";
// Helpers
import { GetUserHelper } from "../../helpers/http.js";
// Controllers
import { TransactionController } from "../../controllers/TransactionController.js";

export const makeGetTransactionController = () => {
  // Repositorys
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const postgresCreateTransactionRepository =
    new PostgresCreateTransactionRepository();
  const postgresGetTransactionByUserIdRepository =
    new PostgresGetTransactionByUserIdRepository();
  // Use-Cases
  const getUserByIdUseCase = new GetUserByIdUseCase(
    postgresGetUserByIdRepository,
  );
  const createTransactionUseCase = new CreateTransactionUseCase(
    postgresCreateTransactionRepository,
  );
  const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
    postgresGetTransactionByUserIdRepository,
  );
  // Helpers
  const getUserHelper = new GetUserHelper(getUserByIdUseCase);
  // Controllers
  const transactionController = new TransactionController(
    getUserHelper,
    createTransactionUseCase,
    getTransactionByUserIdUseCase,
  );

  return transactionController;
};
