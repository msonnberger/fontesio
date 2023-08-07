import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/login');
	}

	if (!session.user.email_verified) {
		throw redirect(302, '/verify-email');
	}

	return {
		user: session.user,
	};
}

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/login');
	},
};
