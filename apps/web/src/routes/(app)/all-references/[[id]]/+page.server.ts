import { csl_json_schema } from '@fontesio/citations/csl-json-schema';
import type { Reference } from '@fontesio/drizzle/schema';
import { create_reference } from '@fontesio/lib/server-only/references/create-reference';
import { delete_reference } from '@fontesio/lib/server-only/references/delete-reference';
import { find_references } from '@fontesio/lib/server-only/references/find-references';
import { get_reference_by_id } from '@fontesio/lib/server-only/references/get-reference-by-id';
import { toggle_favorite_reference } from '@fontesio/lib/server-only/references/toggle-favorite-reference';
import { update_reference } from '@fontesio/lib/server-only/references/update-reference';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export async function load({ locals, url, params }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	let reference: Reference | null = null;

	if (params.id && params.id !== 'new') {
		reference = await get_reference_by_id({ id: params.id, user_id: locals.session.user.id });
	}

	return {
		user: locals.session.user,
		manual_form: params.id
			? await superValidate(reference?.csl_json ?? null, zod(csl_json_schema), {
					id: 'manual_form',
			  })
			: undefined,
		from_identifier_form: await superValidate(zod(csl_json_schema), { id: 'from_identifier_form' }),
		references: await find_references({
			user_id: locals.session.user.id,
			page: Number(url.searchParams.get('page')) || 1,
			per_page: Number(url.searchParams.get('per_page')) || 10,
		}),
		reference,
	};
}

const id_only_schema = z.object({ id: z.string() });

export const actions = {
	add_reference: async (event) => {
		const session = event.locals.session;

		if (!session) {
			error(401);
		}

		const form = await superValidate(event, zod(csl_json_schema));

		if (!form.valid) {
			return fail(400, {
				manual_form: form,
			});
		}

		if (form.data.id) {
			await update_reference({
				id: form.data.id,
				user_id: session.user.id,
				csl_json: form.data,
			});
		} else {
			await create_reference({
				user_id: session.user.id,
				csl_json: form.data,
			});
		}

		redirect(303, '/all-references');
	},
	delete_reference: async (event) => {
		const session = event.locals.session;

		if (!session) {
			error(401);
		}

		const form = await superValidate(event, zod(id_only_schema));

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await delete_reference({
			user_id: session.user.id,
			id: form.data.id,
		});

		return {
			form,
			success: true,
		};
	},
	favorite_reference: async (event) => {
		const session = event.locals.session;

		if (!session) {
			error(401);
		}

		const form = await superValidate(event, zod(id_only_schema));

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		await toggle_favorite_reference({
			user_id: session.user.id,
			id: form.data.id,
		});

		return {
			form,
			success: true,
		};
	},
};
