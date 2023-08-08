import { auth } from '$lib/server/lucia';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();
	if (!session) {
		throw error(401);
	}

	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);
	throw redirect(302, '/login');
}
