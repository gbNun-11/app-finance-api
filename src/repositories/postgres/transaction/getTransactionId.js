import { PostgresHelper } from "../../../database/postgres/client.js";

export class PostgresGetTransactionByIdRepository {
  async execute(transactionId) {
    const transactions = await PostgresHelper.query(
      "SELECT * FROM transactions WHERE id = $1",
      [transactionId],
    );

    return transactions.rows[0];
  }
}
