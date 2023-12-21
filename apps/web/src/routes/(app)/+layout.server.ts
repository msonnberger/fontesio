import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, '/login');
	}

	return {
		pathname: url.pathname,
		user: session.user,
	};
}
