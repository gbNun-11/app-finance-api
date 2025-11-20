import { Router } from "express";
import CreateUserController from "../controllers/createUser.js";

const router = new Router();

router.post("/", CreateUserController.execute);

export default router;
