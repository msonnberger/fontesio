import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (session) {
		throw redirect(302, '/');
	}
}

export const actions = {
	default: async ({ request, locals }) => {
		const form_data = await request.formData();
		const email = form_data.get('email');
		const password = form_data.get('password');

		if (typeof email !== 'string' || !email.includes('@')) {
			return fail(400, {
				message: 'Invalid email',
			});
		}
		if (typeof password !== 'string' || password.length < 1) {
			return fail(400, {
				message: 'Invalid password',
			});
		}
		try {
			const user = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});
			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect username of password',
				});
			}
			return fail(500, {
				message: 'An unknown error occurred',
			});
		}

		throw redirect(302, '/');
	},
};
