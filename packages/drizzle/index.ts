import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const sql = postgres(process.env.DATABASE_URL as string, {
	prepare: false,
	ssl: process.env.DATABASE_SSL_CERT ? { ca: process.env.DATABASE_SSL_CERT } : undefined,
});
export const db = drizzle(sql, { schema });
export type DrizzleDb = PostgresJsDatabase<typeof schema>;
