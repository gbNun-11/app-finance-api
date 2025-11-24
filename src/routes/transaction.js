import { Router } from "express";
import { makeGetTransactionController } from "../factories/controller/transaction.js";

const router = new Router();
const transactionController = makeGetTransactionController();

router.get("/", (req, res) => transactionController.show(req, res));
router.patch("/:transactionId", (req, res) =>
  transactionController.update(req, res),
);
router.delete("/:transactionId", (req, res) =>
  transactionController.delete(req, res),
);
router.post("/", (req, res) => transactionController.store(req, res));

export default router;
