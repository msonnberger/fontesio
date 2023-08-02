import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { pg } from '@lucia-auth/adapter-postgresql';
import { google } from '@lucia-auth/oauth/providers';
import { DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

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

export const google_auth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: 'http://localhost:3000/auth/login/google/callback',
	scope: ['https://www.googleapis.com/auth/userinfo.email'],
});

export const is_valid_oauth_provider = (provider: string) => ['google'].includes(provider);

export type Auth = typeof auth;
