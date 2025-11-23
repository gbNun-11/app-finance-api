import express from "express";

import userRoutes from "./src/routes/user.js";
import transactionRoutes from "./src/routes/transaction.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/transaction", transactionRoutes);
  }
}

export default new App().app;
