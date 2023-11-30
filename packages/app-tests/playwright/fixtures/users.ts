import type { DrizzleDb } from '@fontesio/drizzle';
import { type User, user_keys, users } from '@fontesio/drizzle/schema';
import { create_user } from '@fontesio/lib/server-only/users/create-user';
import type { Page, WorkerInfo } from '@playwright/test';
import { eq, inArray } from 'drizzle-orm';
import { generateScryptHash } from '../crypto-utils/hash';

type UserFixture = ReturnType<typeof create_user_fixture>;

export function create_users_fixture(page: Page, worker_info: WorkerInfo, db: DrizzleDb) {
	const store = { users: [], page } as { users: UserFixture[]; page: typeof page };

	return {
		create: async () => {
			const email = `test-${worker_info.workerIndex}-${Date.now()}@fontesio.com`;
			const user = await create_user({ email, email_verified: true });

			await db.insert(user_keys).values({
				id: `email:${email.toLowerCase()}`,
				user_id: user.id,
				hashed_password: await generateScryptHash(email),
			});

			const user_fixture = create_user_fixture(user, store.page, db);
			store.users.push(user_fixture);
			return user_fixture;
		},
		get: () => store.users,
		logout: async () => {
			await page.goto('/logout');
		},
		delete_all: async () => {
			const ids = store.users.map((u) => u.id);
			await db.delete(users).where(inArray(users.id, ids));
			store.users = [];
		},
		delete: async (id: string) => {
			await db.delete(users).where(eq(users.id, id));
			store.users = store.users.filter((b) => b.id !== id);
		},
	};
}

function create_user_fixture(user: User, page: Page, db: DrizzleDb) {
	const store = { user, page };

	return {
		id: user.id,
		email: user.email,
		email_verified: user.email_verified,
		login: async () => login(store.user, store.page),
		logout: async () => {
			await page.goto('/logout');
		},
		delete: async () => {
			await db.delete(users).where(eq(users.id, store.user.id));
		},
	};
}

export async function login(user: Pick<User, 'email'> & { password?: string }, page: Page) {
	const login_locator = page.locator('#email-password-form');
	const email_locator = login_locator.locator('#email');
	const password_locator = login_locator.locator('#password');
	const submit_locator = login_locator.locator('[type="submit"]');

	await page.goto('/');
	await email_locator.fill(user.email);
	await password_locator.fill(user.password ?? user.email);
	await submit_locator.click();

	await page.waitForLoadState('networkidle');
}
