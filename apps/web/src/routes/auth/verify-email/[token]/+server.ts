import { validate_verification_token } from '$lib/features/auth/token.js';
import { auth } from '$lib/server/lucia';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ locals, params }) {
	try {
		const user_id = await validate_verification_token(params.token);
		const user = await auth.getUser(user_id);
		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: true,
		});

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		locals.auth.setSession(session);
	} catch (e) {
		console.error(e);
		throw error(400, 'Invalid email verification link');
	}

	throw redirect(302, '/');
}
