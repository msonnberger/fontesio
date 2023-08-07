import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';

import { postgres } from '@lucia-auth/adapter-postgresql';
import { google } from '@lucia-auth/oauth/providers';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { sql } from './db';
import { WEBAPP_URL } from '$lib/utils/constants';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
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

export const google_auth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${WEBAPP_URL}/login/google/callback`,
	scope: ['https://www.googleapis.com/auth/userinfo.email'],
});

export const is_valid_oauth_provider = (provider: string) => ['google'].includes(provider);

export type Auth = typeof auth;
