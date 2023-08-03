import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DATABASE_URL } from '$env/static/private';

export const sql = postgres(DATABASE_URL);
export const db = drizzle(sql);
