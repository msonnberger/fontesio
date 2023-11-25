import { csl_json_schema } from '@fontesio/citations/csl-json-schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { get_all_resources_by_user_id } from '@fontesio/lib/server-only/resources/get-all-resources-by-user-id';
import { create_resource } from '@fontesio/lib/server-only/resources/create-resource';

export async function load({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, '/login');
	}

	if (!session.user.email_verified) {
		throw redirect(302, '/verify-email');
	}

	return {
		user: session.user,
		form: superValidate(csl_json_schema),
		resources: get_all_resources_by_user_id({ user_id: session.user.userId }),
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

		await create_resource({ user_id: session.user.userId, csl_json: form.data });

		return {
			form,
			success: true,
		};
	},
};
