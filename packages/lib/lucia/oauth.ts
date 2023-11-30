import { env as client_env } from '@fontesio/env/client';
import { env as server_env } from '@fontesio/env/server';
import { google } from '@lucia-auth/oauth/providers';
import { auth } from './auth';

export { OAuthRequestError } from '@lucia-auth/oauth';

export const google_auth = google(auth, {
	clientId: server_env.GOOGLE_CLIENT_ID,
	clientSecret: server_env.GOOGLE_CLIENT_SECRET,
	redirectUri: `${client_env.PUBLIC_WEBAPP_URL}/login/google/callback`,
	scope: ['https://www.googleapis.com/auth/userinfo.email'],
});

export const is_valid_oauth_provider = (provider: string) => ['google'].includes(provider);
