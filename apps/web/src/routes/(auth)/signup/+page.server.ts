import { signup_schema } from '$lib/zod';
import { generate_uuid_v7 } from '@fontesio/drizzle/uuid';
import { auth } from '@fontesio/lib/lucia/auth';
import { send_verification_email } from '@fontesio/lib/server-only/auth/send-verification-email';
import { get_user_by_email } from '@fontesio/lib/server-only/users/get-user-by-email';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError, type User } from 'lucia';
import { message, superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(signup_schema, { errors: true });

	return { form };
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signup_schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;
		let user_not_verified;

		try {
			const get_user = async () => {
				let user: User;

				try {
					const existing_db_user = await get_user_by_email({ email });
					user = auth.transformDatabaseUser(existing_db_user);
					await auth.createKey({
						providerId: 'email',
						userId: user.userId,
						providerUserId: email.toLowerCase(),
						password,
					});
				} catch (e) {
					user = await auth.createUser({
						userId: generate_uuid_v7(),
						key: {
							providerId: 'email',
							providerUserId: email.toLowerCase(),
							password,
						},
						attributes: {
							email,
							email_verified: false,
						},
					});
				}

				return user;
			};

			const user = await get_user();
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			if (!user.email_verified) {
				await send_verification_email({ user_id: user.userId, email: user.email });
				user_not_verified = true;
			}

			locals.auth.setSession(session);
		} catch (e) {
			console.error(e);

			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, 'This email already exists.');
			}

			return message(form, 'An unknown error occured.');
		}

		throw redirect(302, user_not_verified ? '/verify-email' : '/');
	},
};
