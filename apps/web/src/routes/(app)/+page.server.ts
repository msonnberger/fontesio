import { csl_json_schema } from '$lib/citations/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

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
	};
}

export const actions = {
	add_resource: async (event) => {
		console.log('here');
		const form = await superValidate(event, csl_json_schema);

		// if (!form.valid) {
		// 	return fail(400, {
		// 		form,
		// 	});
		// }

		console.log(form.data);

		return {
			form,
		};
	},
};
