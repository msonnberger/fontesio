import { login_schema } from '$lib/zod';
import { lucia } from '@fontesio/lib/lucia/auth';
import { verify_password } from '@fontesio/lib/lucia/password';
import { get_user_by_email } from '@fontesio/lib/server-only/users/get-user-by-email';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ locals }) {
	if (locals.session) {
		redirect(302, '/');
	}

	const form = await superValidate(zod(login_schema));

	return { form };
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(login_schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			const user = await get_user_by_email({ email });

			if (!user) {
				return message(form, 'We do not recognize that email or password.');
			}

			if (!user.hashed_password) {
				return message(
					form,
					'This account appears to be using a social login method, please sign in using that method',
				);
			}

			const is_password_correct = await verify_password(user.hashed_password, password);

			if (!is_password_correct) {
				return message(form, 'We do not recognize that email or password.');
			}

			const session = await lucia.createSession(user.id, {});
			const cookie = lucia.createSessionCookie(session.id);
			cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });
		} catch (e) {
			return message(form, 'An unknown error occured.');
		}

		redirect(302, '/');
	},
};
