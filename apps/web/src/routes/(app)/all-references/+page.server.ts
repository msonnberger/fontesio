import {
	csl_json_form,
	csl_json_schema,
	transform_csl_form_data,
} from '@fontesio/citations/csl-json-schema';
import { create_reference } from '@fontesio/lib/server-only/references/create-reference';
import { find_references } from '@fontesio/lib/server-only/references/find-references';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals, url }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	return {
		user: locals.session.user,
		manual_form: await superValidate(csl_json_form),
		from_identifier_form: await superValidate(csl_json_schema),
		references: await find_references({
			user_id: locals.session.user.id,
			page: Number(url.searchParams.get('page')) || 1,
			per_page: Number(url.searchParams.get('per_page')) || 14,
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
			csl_json: transform_csl_form_data(form.data),
		});

		return {
			form,
			success: true,
		};
	},
	add_reference_from_identifier: async (event) => {
		const session = event.locals.session;

		if (!session) {
			error(401);
		}

		const form = await superValidate(event, csl_json_schema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await create_reference({
			user_id: session.user.id,
			csl_json: form.data,
		});

		return {
			form,
			success: true,
		};
	},
};
