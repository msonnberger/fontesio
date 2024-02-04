import { sql } from '@fontesio/drizzle';
import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql';
import { Lucia } from 'lucia';

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			email_verified: boolean;
		};
		DatabaseSessionAttributes: unknown;
	}
}

const adapter = new PostgresJsAdapter(sql, {
	user: 'users',
	session: 'sessions',
});

export const lucia = new Lucia(adapter, {
	getUserAttributes: (data) => {
		return {
			email: data.email,
			email_verified: data.email_verified,
		};
	},
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
});

import type { Cookie, Session as LuciaSession, User } from 'lucia';

export type { Cookie };

export interface Session extends LuciaSession {
	user: User;
}
