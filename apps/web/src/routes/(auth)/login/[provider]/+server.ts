import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as public_env } from '$env/dynamic/public';
import {
	create_google_auth,
	generate_code_verifier,
	generate_state,
	is_valid_oauth_provider,
} from '@fontesio/lib/lucia/oauth';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ cookies, params }) {
	if (!is_valid_oauth_provider(params.provider)) {
		error(404);
	}

	const state = generate_state();
	const code_verifier = generate_code_verifier();
	const google_auth = create_google_auth({
		webapp_url: public_env.PUBLIC_WEBAPP_URL,
		client_id: env.GOOGLE_CLIENT_ID,
		client_secret: env.GOOGLE_CLIENT_SECRET,
	});

	const url = await google_auth.createAuthorizationURL(state, code_verifier, {
		scopes: ['https://www.googleapis.com/auth/userinfo.email'],
	});

	cookies.set('oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 10,
	});

	cookies.set('code_verifier', code_verifier, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 10,
	});

	redirect(302, url.toString());
}
