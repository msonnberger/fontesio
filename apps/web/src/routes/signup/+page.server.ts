import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { auth } from '$lib/server/lucia';
import { generate_uuid_v7 } from '$lib/utils/uuid.js';
import { DatabaseError } from '@neondatabase/serverless';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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
		if (typeof password !== 'string' || password.length < 6) {
			return fail(400, {
				message: 'Invalid password',
			});
		}
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
					},
				});

				return user;
			};

			const user = await get_user();
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			console.log(e);

			if (e instanceof DatabaseError) {
				return fail(400, {
					message: 'Email already registerd',
				});
			}
			return fail(500, {
				message: 'An unknown error occurred',
			});
		}

		throw redirect(302, '/');
	},
};
