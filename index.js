import "dotenv/config.js";
import app from "./app.js";

const port = process.env.PORT;
app.listen(port, () => {
  console.log();
  console.log(`Escutando na Porta: ${port}`);
  console.log(`URL Acess: http://localhost:${port}`);
});
