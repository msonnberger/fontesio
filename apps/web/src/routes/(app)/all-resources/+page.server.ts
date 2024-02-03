import { invalidate } from '$app/navigation';
import { csl_json_form } from '@fontesio/citations/csl-json-schema';
import { create_resource } from '@fontesio/lib/server-only/resources/create-resource';
import { get_all_resources_by_user_id } from '@fontesio/lib/server-only/resources/get-all-resources-by-user-id';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	return {
		user: locals.session.user,
		form: await superValidate(csl_json_form),
		resources: await get_all_resources_by_user_id({
			user_id: locals.session.user.id,
		}),
	};
}

export const actions = {
	add_resource: async (event) => {
		const session = event.locals.session;

		if (!session) {
			error(401);
		}

		const form = await superValidate(event, csl_json_form);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await create_resource({
			user_id: session.user.id,
			csl_json_form: form.data,
		});

		return {
			form,
			success: true,
		};
	},
};
