// Repositorys
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/index.js";
import { PostgresCreateTransactionRepository } from "../../repositories/postgres/transaction/index.js";
// Use-Cases
import { GetUserByIdUseCase } from "../../use-cases/user/index.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/index.js";
// Helpers
import { GetUserHelper } from "../../helpers/http.js";
// Controllers
import { TransactionController } from "../../controllers/TransactionController.js";

export const makeGetTransactionController = () => {
  // Repositorys
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const postgresCreateTransactionRepository =
    new PostgresCreateTransactionRepository();
  // Use-Cases
  const getUserByIdUseCase = new GetUserByIdUseCase(
    postgresGetUserByIdRepository,
  );
  const createTransactionUseCase = new CreateTransactionUseCase(
    postgresCreateTransactionRepository,
  );
  // Helpers
  const getUserHelper = new GetUserHelper(getUserByIdUseCase);
  // Controllers
  const transactionController = new TransactionController(
    getUserHelper,
    createTransactionUseCase,
  );

  return transactionController;
};
