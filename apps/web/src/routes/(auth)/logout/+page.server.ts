import { auth } from '@fontesio/lib/lucia/auth';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			error(401);
		}

		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		redirect(302, '/login');
	},
};
