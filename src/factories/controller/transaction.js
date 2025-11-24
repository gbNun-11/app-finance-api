// Repositorys
import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresGetTransactionByUserIdRepository,
  PostgresUpdateTransactionRepository,
  PostgresGetTransactionByIdRepository,
  PostgresDeleteTransactionRepository,
} from "../../repositories/postgres/index.js";
// Use-Cases
import {
  GetUserByIdUseCase,
  CreateTransactionUseCase,
  GetTransactionByUserIdUseCase,
  UpdateTransactionUseCase,
  GetTransactionByIdUseCase,
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
  const postgresUpdateTransactionRepository =
    new PostgresUpdateTransactionRepository();
  const postgresGetTransactionByIdRepository =
    new PostgresGetTransactionByIdRepository();
  const postgresDeleteTransactionRepository =
    new PostgresDeleteTransactionRepository();
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
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    postgresUpdateTransactionRepository,
  );
  const getTransactionByIdUseCase = new GetTransactionByIdUseCase(
    postgresGetTransactionByIdRepository,
  );
  const deleteTransactionUseCase = postgresDeleteTransactionRepository;
  console.log(deleteTransactionUseCase);
  // Helpers
  const getUserHelper = new GetUserHelper(
    getUserByIdUseCase,
    getTransactionByIdUseCase,
  );
  // Controllers
  const transactionController = new TransactionController(
    getUserHelper,
    createTransactionUseCase,
    getTransactionByUserIdUseCase,
    updateTransactionUseCase,
  );

  return transactionController;
};
