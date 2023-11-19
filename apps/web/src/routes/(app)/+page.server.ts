import { csl_json_schema } from '$lib/citations/schema';
import { db } from '$lib/server/db';
import { resources } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/login');
	}

	if (!session.user.email_verified) {
		throw redirect(302, '/verify-email');
	}

	const all_resources = await db
		.select()
		.from(resources)
		.where(eq(resources.user_id, session.user.userId));

	return {
		user: session.user,
		form: superValidate(csl_json_schema),
		resources: all_resources,
	};
}

export const actions = {
	add_resource: async (event) => {
		const session = await event.locals.auth.validate();

		if (!session) {
			throw error(401);
		}

		const form = await superValidate(event, csl_json_schema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await db.insert(resources).values({
			user_id: session.user.userId,
			csl_json: form.data,
		});

		return {
			form,
			success: true,
		};
	},
};
