import { drizzle } from "drizzle-orm/libsql/web";
import { usersTable } from "./database/schema";

export class Database {
  private db = drizzle({
    connection: {
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_TOKEN!,
    },
  });

  async selectUsers() {
    return await this.db.select().from(usersTable);
  }
}
