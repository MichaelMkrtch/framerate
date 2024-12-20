import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { usersTable } from "./schema";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle({ client });

async function main() {
  console.log(process.env.DATABASE_URL);
  // const users = await db.select().from(usersTable);
  // console.log(users);
}

main();
