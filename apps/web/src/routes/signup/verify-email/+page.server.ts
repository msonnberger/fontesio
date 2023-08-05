import { generate_verification_token, send_verification_link } from '$lib/features/auth/token';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/auth/login');
	}

	if (session.user.email_verified) {
		throw redirect(302, '/');
	}
}

export const actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			throw error(401);
		}

		if (session.user.email_verified) {
			throw error(422);
		}

		try {
			const token = await generate_verification_token(session.user.userId);
			await send_verification_link(session.user.email, token);

			return {
				new_link_sent: true,
			};
		} catch {
			throw error(500);
		}
	},
};
