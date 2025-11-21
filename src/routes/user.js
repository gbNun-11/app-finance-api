import { Router } from "express";

const router = new Router();

// Repositorys
import { PostgresGetUserByIdRepository } from "../repositories/postgres/getUserById.js";
import { PostgresGetUserByEmailReposity } from "../repositories/postgres/getUserByEmail.js";
import { PostgresUpdateUserRepository } from "../repositories/postgres/updateUser.js";
import { PostgresDeleteUserRepository } from "../repositories/postgres/deleteUser.js";
import { PostgresCreateUserRepository } from "../repositories/postgres/createUser.js";

const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
const postgresGetUserByEmailReposity = new PostgresGetUserByEmailReposity();
const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
const postgresCreateUserRepository = new PostgresCreateUserRepository();

// Use-Cases
import { GetUserByIdUseCase } from "../use-cases/getUserById.js";
import { UpdateUserUseCase } from "../use-cases/updateUser.js";
import { DeleteUserUseCase } from "../use-cases/deleteUser.js";
import { CreateUserUseCase } from "../use-cases/createUser.js";

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
import { GetUserHelper } from "../helpers/http.js";

const getUserHelper = new GetUserHelper(getUserByIdUseCase);

// Controllers
import { UserController } from "../controllers/UserController.js";

const userController = new UserController(
  getUserHelper,
  updateUserUseCase,
  createUserUseCase,
  deleteUserUseCase,
);

// Routes
router.get("/:userId", (req, res) => userController.show(req, res));
router.patch("/:userId", (req, res) => userController.update(req, res));
router.delete("/:userId", (req, res) => userController.delete(req, res));
router.post("/", (req, res) => userController.store(req, res));

export default router;
