import {
	generate_verification_code,
	send_verification_code,
	validate_verification_code,
} from '$lib/features/auth/verification-code';
import { auth } from '$lib/server/lucia';
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

			const data = await request.formData();
			const code = data.get('verification_code') as string | null;

			if (!code) {
				throw error(400);
			}

			const user_id = await validate_verification_code(
				session.user.userId,
				code.replaceAll(',', ''),
			);
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
			throw error(400, 'Invalid email verification link');
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
			const token = await generate_verification_code(session.user.userId);
			await send_verification_code(session.user.email, token);

			return {
				new_code_sent: true,
			};
		} catch {
			throw error(500);
		}
	},
};
