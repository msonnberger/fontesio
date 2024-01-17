import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, '/login');
	}

	if (!session.user.email_verified) {
		redirect(302, '/verify-email');
	}

	redirect(302, '/all-resources');
}
