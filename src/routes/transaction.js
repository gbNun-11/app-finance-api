import { Router } from "express";

const router = new Router();
const transactionController = 123;

router.post("/", (req, res) => transactionController.store(req, res));
