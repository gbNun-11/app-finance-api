import express from "express";

import userRoutes from "./src/routes/user.js";

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
  }
}

export default new App().app;
