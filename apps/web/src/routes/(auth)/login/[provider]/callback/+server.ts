import { generate_uuid_v7 } from '@fontesio/drizzle/uuid';
import { type User, auth } from '@fontesio/lib/lucia/auth';
import { OAuthRequestError, google_auth, is_valid_oauth_provider } from '@fontesio/lib/lucia/oauth';
import { get_user_by_email } from '@fontesio/lib/server-only/users/get-user-by-email';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ url, cookies, locals, params }) {
	if (!is_valid_oauth_provider(params.provider)) {
		error(404);
	}

	const stored_state = cookies.get('fontesio_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!stored_state || !state || stored_state !== state || !code) {
		error(400);
	}

	try {
		const { getExistingUser, googleUser, createUser, createKey } =
			await google_auth.validateCallback(code);

		const get_user = async () => {
			const existing_user = await getExistingUser();
			if (existing_user) return existing_user;

			if (!googleUser.email_verified || !googleUser.email) {
				error(400, 'Email not verified');
			}

			let user: User;

			try {
				const existing_db_user = await get_user_by_email({
					email: googleUser.email,
				});
				user = auth.transformDatabaseUser(existing_db_user);
				await createKey(user.userId);
			} catch (e) {
				user = await createUser({
					userId: generate_uuid_v7(),
					attributes: {
						email: googleUser.email,
						email_verified: googleUser.email_verified,
					},
				});
			}

			return user;
		};

		const user = await get_user();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		locals.auth.setSession(session);
	} catch (e) {
		console.error(e);
		// invalid code
		if (e instanceof OAuthRequestError) {
			error(400);
		}

		error(500);
	}

	redirect(302, '/');
}
