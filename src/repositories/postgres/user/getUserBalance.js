import { PostgresHelper } from "../../../database/postgres/client.js";

export class PostgresGetUserBalanceRepository {
  async execute(userId) {
    const balanceUser = await PostgresHelper.query(
      `
        SELECT 
          SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) as EARNING,
          SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as EXPENSE,
          SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) as INVESTMENT,
          (
            SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
            - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
            - SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)
          ) AS BALANCE
          FROM transactions
          WHERE user_id = $1;
      `,
      [userId],
    );

    return {
      userId,
      ...balanceUser.rows[0],
    };
  }
}
