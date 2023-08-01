import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { pg } from '@lucia-auth/adapter-postgresql';
import { DATABASE_URL } from '$env/static/private';

import { WebSocket } from 'undici';
neonConfig.webSocketConstructor = WebSocket;
const pool = new Pool({ connectionString: DATABASE_URL });

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: pg(pool, {
		user: 'users',
		key: 'user_keys',
		session: 'sessions',
	}),
	getUserAttributes: (data) => {
		return {
			email: data.email,
		};
	},
});

export type Auth = typeof auth;
