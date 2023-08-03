import { generate_verification_token, send_verification_link } from '$lib/features/auth/token.js';
import { error } from '@sveltejs/kit';

export async function GET({ locals }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw error(401);
	}

	if (session.user.email_verified) {
		throw error(422);
	}

	try {
		const token = await generate_verification_token(session.user.userId);
		await send_verification_link(session.user.email, token);
		return new Response();
	} catch {
		throw error(500);
	}
}
