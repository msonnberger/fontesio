import type { DrizzleDb } from '@fontesio/drizzle';
import { sessions, users } from '@fontesio/drizzle/schema';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof create_lucia>;
		DatabaseUserAttributes: {
			email: string;
			email_verified: boolean;
		};
		DatabaseSessionAttributes: unknown;
	}
}

export function create_lucia(db: DrizzleDb) {
	const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

	return new Lucia(adapter, {
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
}

import type { Cookie, Session as LuciaSession, User } from 'lucia';

export type { Cookie };

export interface Session extends LuciaSession {
	user: User;
}
