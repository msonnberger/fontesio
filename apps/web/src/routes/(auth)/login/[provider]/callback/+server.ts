import { lucia } from '@fontesio/lib/lucia/auth';
import {
	OAuth2RequestError,
	get_provider_user,
	google_auth,
	is_valid_oauth_provider,
} from '@fontesio/lib/lucia/oauth';
import { create_user } from '@fontesio/lib/server-only/users/create-user.js';
import { get_user_by_email } from '@fontesio/lib/server-only/users/get-user-by-email';
import { create_oauth_account } from '@fontesio/lib/server-only/auth/create-oauth-account';
import { get_oauth_account } from '@fontesio/lib/server-only/auth/get-oauth-account';

import { error, redirect } from '@sveltejs/kit';

export async function GET({ url, cookies, locals, params }) {
	const provider = params.provider;

	if (!is_valid_oauth_provider(params.provider)) {
		error(404);
	}

	const stored_state = cookies.get('oauth_state');
	const stored_code_verifier = cookies.get('code_verifier');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!stored_state || !stored_code_verifier || !code || stored_state !== state) {
		error(400);
	}

	try {
		const tokens = await google_auth.validateAuthorizationCode(code, stored_code_verifier);
		const google_user = get_provider_user(tokens.idToken);
		let user = await get_user_by_email({ email: google_user.email });

		if (user) {
			const existing_oauth_account = await get_oauth_account({
				user_id: user.id,
				provider_id: provider,
			});

			if (existing_oauth_account === null) {
				await create_oauth_account({
					provider_id: provider,
					provider_user_id: google_user.sub,
					user_id: user.id,
				});
			}
		}

		if (!user) {
			user = await create_user({
				idendity_provider: 'google',
				provider_user_id: google_user.sub,
				email: google_user.email,
				email_verified: google_user.email_verified,
			});
		}

		const session = await lucia.createSession(user.id, {});
		const cookie = lucia.createSessionCookie(session.id);
		cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });
	} catch (e) {
		console.error(e);
		// invalid code
		if (e instanceof OAuth2RequestError) {
			error(400);
		}

		error(500);
	}

	redirect(302, '/');
}
