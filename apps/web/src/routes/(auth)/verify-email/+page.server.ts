import { auth } from '@fontesio/lib/lucia/auth';
import { check_ratelimit_and_throw } from '@fontesio/lib/ratelimit/check-ratelimit-and-throw';
import { send_verification_email } from '@fontesio/lib/server-only/auth/send-verification-email';
import { validate_verification_code } from '@fontesio/lib/server-only/auth/validate-verification-code';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/login');
	}

	if (session.user.email_verified) {
		throw redirect(302, '/');
	}
}

export const actions = {
	verify: async ({ locals, request }) => {
		try {
			let session = await locals.auth.validate();

			if (!session) {
				throw error(401);
			}

			await check_ratelimit_and_throw({ identifier: session.user.email });

			const data = await request.formData();
			const code = data.get('verification_code') as string | null;

			if (!code) {
				throw error(400);
			}

			const user_id = await validate_verification_code({
				user_id: session.user.userId,
				code: code.replaceAll(',', ''),
			});
			const user = await auth.getUser(user_id);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateUserAttributes(user.userId, {
				email_verified: true,
			});

			session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			locals.auth.setSession(session);
		} catch (e) {
			console.error(e);
			throw error(400, 'Invalid verification code');
		}

		throw redirect(302, '/');
	},
	new_code: async ({ locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw error(401);
		}

		if (session.user.email_verified) {
			throw error(422);
		}

		try {
			const { email, userId } = session.user;
			await send_verification_email({ email, user_id: userId });

			return {
				new_code_sent: true,
			};
		} catch {
			throw error(500);
		}
	},
};
