import { sql } from '@fontesio/drizzle';
import { postgres } from '@lucia-auth/adapter-postgresql';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: postgres(sql, {
		user: 'users',
		key: 'user_keys',
		session: 'sessions',
	}),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			email_verified: data.email_verified,
		};
	},
});

export type Auth = typeof auth;

export { type AuthRequest, type User, LuciaError } from 'lucia';
