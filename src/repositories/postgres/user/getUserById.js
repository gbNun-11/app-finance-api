import { PostgresHelper } from "../../../database/postgres/client.js";

export class PostgresGetUserByIdRepository {
  async execute(userId) {
    const user = await PostgresHelper.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
    );

    return user.rows[0];
  }
}
