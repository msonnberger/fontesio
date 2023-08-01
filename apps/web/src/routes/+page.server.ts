import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/auth/login');
	}

	return {
		user_id: session.user.userId,
		email: session.user.email,
	};
}

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/auth/login');
	},
};
