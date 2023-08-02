import { auth, google_auth, is_valid_oauth_provider } from '$lib/server/lucia';
import { generate_uuid_v7 } from '$lib/utils/uuid.js';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ url, cookies, locals, params }) {
	if (!is_valid_oauth_provider(params.provider)) {
		throw error(404);
	}

	const stored_state = cookies.get('fontesio_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!stored_state || !state || stored_state !== state || !code) {
		throw error(400);
	}

	try {
		const { existingUser, googleUser, createUser } = await google_auth.validateCallback(code);

		const get_user = async () => {
			if (existingUser) return existingUser;
			const user = await createUser({
				userId: generate_uuid_v7(),
				attributes: { email: googleUser.email ?? '' },
			});
			return user;
		};

		const user = await get_user();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		locals.auth.setSession(session);
	} catch (e) {
		// invalid code
		if (e instanceof OAuthRequestError) {
			throw error(400);
		}

		throw error(500);
	}

	throw redirect(302, '/');
}
