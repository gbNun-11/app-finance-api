import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.get("/:userId", UserController.show);
router.patch("/:userId", UserController.update);
router.post("/", UserController.store);

export default router;
