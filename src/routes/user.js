import { Router } from "express";
import CreateUserController from "../controllers/createUser.js";
import GetUserByIdController from "../controllers/getUserById.js";

const router = new Router();

router.get("/:userId", GetUserByIdController.execute);
router.post("/", CreateUserController.execute);

export default router;
