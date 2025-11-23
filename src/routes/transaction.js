import { Router } from "express";
import { makeGetTransactionController } from "../factories/controller/transaction.js";

const router = new Router();
const transactionController = makeGetTransactionController();

router.post("/", (req, res) => transactionController.store(req, res));

export default router;
