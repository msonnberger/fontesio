import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	if (!locals.session.user.email_verified) {
		redirect(302, '/verify-email');
	}

	redirect(302, '/all-resources');
}
