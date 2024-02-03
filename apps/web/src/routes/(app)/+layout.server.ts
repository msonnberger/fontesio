import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	return {
		pathname: url.pathname,
		user: locals.session.user,
	};
}
