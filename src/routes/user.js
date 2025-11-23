import { Router } from "express";
import { makeGetUserController } from "../factories/controller/user.js";

const router = new Router();
const userController = makeGetUserController();

// Routes
router.get("/:userId", (req, res) => userController.show(req, res));
router.patch("/:userId", (req, res) => userController.update(req, res));
router.delete("/:userId", (req, res) => userController.delete(req, res));
router.post("/", (req, res) => userController.store(req, res));

export default router;
