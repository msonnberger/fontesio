import { csl_json_form } from '@fontesio/citations/csl-json-schema';
import { create_reference } from '@fontesio/lib/server-only/references/create-reference';
import { get_all_references_by_user_id } from '@fontesio/lib/server-only/references/get-all-references-by-user-id';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	return {
		user: locals.session.user,
		form: await superValidate(csl_json_form),
		references: await get_all_references_by_user_id({
			user_id: locals.session.user.id,
		}),
	};
}

export const actions = {
	add_reference: async (event) => {
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

		await create_reference({
			user_id: session.user.id,
			csl_json_form: form.data,
		});

		return {
			form,
			success: true,
		};
	},
};
