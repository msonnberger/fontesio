import { lucia } from '$lib';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) {
			error(401);
		}

		await lucia.invalidateSession(locals.session.id);
		const cookie = lucia.createBlankSessionCookie();
		cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });

		redirect(302, '/login');
	},
};
