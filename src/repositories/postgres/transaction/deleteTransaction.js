import { PostgresHelper } from "../../../database/postgres/client.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionId) {
    const deletedTransactions = await PostgresHelper.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [transactionId],
    );

    return deletedTransactions.rows[0];
  }
}
