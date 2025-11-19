import "dotenv/config.js";
import express from "express";

import { PostgresHelper } from "./src/database/postgres/client.js";

const app = express();

app.get("/", async (req, res) => {
  const results = await PostgresHelper.query("SELECT * FROM users");

  res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log("Listening on port 3000"));
