import postgres from 'postgres';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { env } from '@fontesio/env/server';
import * as schema from './schema';

export const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
export type DrizzleDb = PostgresJsDatabase<typeof schema>;
