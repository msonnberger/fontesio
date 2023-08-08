import { test as base } from '@playwright/test';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { create_users_fixture } from '../fixtures/users';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export const sql = postgres(process.env.DATABASE_URL!);
export const db = drizzle(sql);

interface Fixtures {
	db: PostgresJsDatabase;
	users: ReturnType<typeof create_users_fixture>;
}

export const test = base.extend<Fixtures>({
	db: async ({}, use) => {
		await use(db);
	},
	users: async ({ page, db }, use, workerInfo) => {
		const users_fixture = create_users_fixture(page, workerInfo, db);
		await use(users_fixture);
	},
});
