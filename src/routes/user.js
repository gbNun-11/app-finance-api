import { Router } from "express";
import CreateUserController from "../controllers/createUser.js";
import GetUserByIdController from "../controllers/getUserById.js";
import UpdateUserController from "../controllers/updateUser.js";

const router = new Router();

router.get("/:userId", GetUserByIdController.execute);
router.patch("/:userId", UpdateUserController.execute);
router.post("/", CreateUserController.execute);

export default router;
