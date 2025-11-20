import "dotenv/config.js";
import express from "express";

import { PostgresHelper } from "./src/database/postgres/client.js";

const app = express();
const port = process.env.PORT;

app.get("/", async (req, res) => {
  const results = await PostgresHelper.query("SELECT * FROM users");

  res.send(JSON.stringify(results));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
