import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { login_schema } from '$lib/zod';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(login_schema);

	return { form };
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, login_schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

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
				return message(form, 'We do not recognize that email or password.');
			}
			return message(form, 'An unknown error occured.');
		}

		throw redirect(302, '/');
	},
};
