import { type DrizzleDb, db } from '@fontesio/drizzle';
import { test as base } from '@playwright/test';
import { create_users_fixture } from '../fixtures/users';

interface Fixtures {
	db: DrizzleDb;
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
