import { dev } from '$app/environment';
import { google_auth, is_valid_oauth_provider } from '@fontesio/lib/lucia/oauth';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ cookies, params }) {
	if (!is_valid_oauth_provider(params.provider)) {
		throw error(404);
	}

	const [url, state] = await google_auth.getAuthorizationUrl();

	cookies.set('fontesio_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60,
	});

	throw redirect(302, url.toString());
}
