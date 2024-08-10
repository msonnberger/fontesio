import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
export { sql } from 'drizzle-orm';

interface CreateDbOptions {
	database_url: string;
	ssl_cert?: string;
}

export function create_db({ database_url, ssl_cert }: CreateDbOptions) {
	const sql = postgres(database_url, {
		prepare: false,
		ssl: ssl_cert ? { ca: ssl_cert } : undefined,
	});

	return drizzle(sql, { schema });
}

export type DrizzleDb = PostgresJsDatabase<typeof schema>;
