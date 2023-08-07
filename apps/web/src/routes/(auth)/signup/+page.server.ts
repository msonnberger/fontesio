import { generate_verification_token, send_verification_link } from '$lib/features/auth/token';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { auth } from '$lib/server/lucia';
import { generate_uuid_v7 } from '$lib/utils/uuid';
import { DatabaseError } from '@neondatabase/serverless';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';
import { signup_schema } from '$lib/zod';

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
				const [existing_db_user] = await db.select().from(users).where(eq(users.email, email));

				if (existing_db_user) {
					const user = auth.transformDatabaseUser(existing_db_user);
					await auth.createKey({
						providerId: 'email',
						userId: user.userId,
						providerUserId: email.toLowerCase(),
						password,
					});

					return user;
				}

				const user = await auth.createUser({
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

				return user;
			};

			const user = await get_user();
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});

			if (!user.email_verified) {
				const token = await generate_verification_token(user.userId);
				await send_verification_link(email, token);
				user_not_verified = true;
			}

			locals.auth.setSession(session);
		} catch (e) {
			console.error(e);

			if (e instanceof DatabaseError) {
				return fail(400, {
					message: 'Email already registerd',
				});
			}
			return fail(500, {
				message: 'An unknown error occurred',
			});
		}

		throw redirect(302, user_not_verified ? '/verify-email' : '/');
	},
};
