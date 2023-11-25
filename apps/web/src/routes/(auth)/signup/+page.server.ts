import { send_verification_code } from '$lib/features/auth/verification-code';
import { create_verification_code } from '@fontesio/lib/server-only/auth/create-verification-code';
import { get_user_by_email } from '@fontesio/lib/server-only/users/get-user-by-email';
import { auth } from '$lib/server/lucia';
import { generate_uuid_v7 } from '$lib/utils/uuid';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { signup_schema } from '$lib/zod';
import { LuciaError, type User } from 'lucia';

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
				const code = await create_verification_code({ user_id: user.userId });
				await send_verification_code(email, code);
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
