import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: pg.Client | undefined;
};

const conn = globalForDb.conn ?? new pg.Client(process.env.DATABASE_URL!);

//use this to query the database
export const db = drizzle(conn, { schema });
