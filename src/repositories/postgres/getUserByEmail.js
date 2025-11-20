import { PostgresHelper } from "../../database/postgres/client.js";

export class PostgresGetUserByEmailReposity {
  async execute(userEmail) {
    const user = await PostgresHelper.query(
      "SELECT * FROM users WHERE email = $1",
      [userEmail],
    );

    return user.rows[0];
  }
}
