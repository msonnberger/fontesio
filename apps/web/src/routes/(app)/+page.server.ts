import { redirect } from '@sveltejs/kit';

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
