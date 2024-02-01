import { dev } from '$app/environment';
import {
	generate_state,
	generate_code_verifier,
	google_auth,
	is_valid_oauth_provider,
} from '@fontesio/lib/lucia/oauth';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ cookies, params }) {
	if (!is_valid_oauth_provider(params.provider)) {
		error(404);
	}

	const state = generate_state();
	const code_verifier = generate_code_verifier();
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
