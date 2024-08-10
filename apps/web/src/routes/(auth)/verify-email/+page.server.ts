import { env } from '$env/dynamic/private';
import { env as public_env } from '$env/dynamic/public';
import { lucia } from '$lib';
import { create_limiter } from '@fontesio/lib/ratelimit/limiter';
import { send_verification_email } from '@fontesio/lib/server-only/auth/send-verification-email';
import { validate_verification_code } from '@fontesio/lib/server-only/auth/validate-verification-code';
import { update_user_email_verified } from '@fontesio/lib/server-only/users/update-email-verified';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.session) {
		redirect(302, '/login');
	}

	if (locals.session.user.email_verified) {
		redirect(302, '/');
	}
}

export const actions = {
	verify: async ({ locals, request, cookies }) => {
		try {
			if (!locals.session) {
				error(401);
			}

			const limiter = create_limiter({
				redis_url: env.UPSTASH_REDIS_REST_URL,
				redis_token: env.UPSTASH_REDIS_REST_TOKEN,
			});
			await limiter.check_ratelimit_and_throw({ identifier: locals.session.user.email });

			const data = await request.formData();
			const code = data.get('verification_code') as string | null;

			if (!code) {
				error(400);
			}

			const user_id = await validate_verification_code({
				user_id: locals.session.user.id,
				code: code.replaceAll(',', ''),
			});

			await lucia.invalidateUserSessions(user_id);

			await update_user_email_verified({ user_id, email_verified: true });

			const session = await lucia.createSession(user_id, {});
			const cookie = lucia.createSessionCookie(session.id);
			cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });
		} catch (e) {
			console.error(e);
			error(400, 'Invalid verification code');
		}

		redirect(302, '/');
	},
	new_code: async ({ locals }) => {
		if (!locals.session) {
			error(401);
		}

		if (locals.session.user.email_verified) {
			error(422);
		}

		try {
			const { email, id } = locals.session.user;
			await send_verification_email({
				email,
				user_id: id,
				webapp_url: public_env.PUBLIC_WEBAPP_URL,
				marketing_url: public_env.PUBLIC_MARKETING_URL,
				from: { name: env.EMAIL_FROM_NAME, address: env.EMAIL_FROM_ADDRESS },
			});

			return {
				new_code_sent: true,
			};
		} catch {
			error(500);
		}
	},
};
