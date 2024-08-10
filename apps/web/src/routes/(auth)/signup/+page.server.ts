import { env } from '$env/dynamic/private';
import { env as public_env } from '$env/dynamic/public';
import { signup_schema } from '$lib/zod';
import type { User } from '@fontesio/drizzle/schema';
import { lucia } from '$lib';
import { send_verification_email } from '@fontesio/lib/server-only/auth/send-verification-email';
import { create_user } from '@fontesio/lib/server-only/users/create-user';
import { get_user_by_email } from '@fontesio/lib/server-only/users/get-user-by-email';
import { update_user_password } from '@fontesio/lib/server-only/users/update-password';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ locals }) {
	if (locals.session) {
		redirect(302, '/');
	}

	const form = await superValidate(zod(signup_schema, { defaults: { email: '', password: '' } }), {
		errors: true,
	});
	form.errors.email = undefined;

	return { form };
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(signup_schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		let user: User;
		const existing_user = await get_user_by_email({ email });

		if (existing_user) {
			if (existing_user.hashed_password) {
				return message(form, 'This email already exists.');
			}

			user = await update_user_password({ user_id: existing_user.id, password });
		} else {
			user = await create_user({
				idendity_provider: 'fontesio',
				email,
				email_verified: false,
				password,
			});
		}

		const session = await lucia.createSession(user.id, {});
		const cookie = lucia.createSessionCookie(session.id);
		cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });

		if (!user.email_verified) {
			await send_verification_email({
				user_id: user.id,
				email,
				webapp_url: public_env.PUBLIC_WEBAPP_URL,
				marketing_url: public_env.PUBLIC_MARKETING_URL,
				from: {
					name: env.EMAIL_FROM_NAME,
					address: env.EMAIL_FROM_ADDRESS,
				},
			});
		}

		redirect(302, user.email_verified ? '/' : '/verify-email');
	},
};
