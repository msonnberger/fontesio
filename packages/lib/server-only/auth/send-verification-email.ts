import { mailer, render } from '@fontesio/email';
import VerifyEmailTemplate from '@fontesio/email/templates/verify-email';
import { env } from '@fontesio/env/server';
import { get_user_by_id } from '../users/get-user-by-id';
import { create_verification_code } from './create-verification-code';

interface SendVerificationEmail {
	user_id: string;
	email?: string;
}

export async function send_verification_email({ user_id, email }: SendVerificationEmail) {
	if (!email) {
		const user = await get_user_by_id({ id: user_id });

		if (!user) {
			throw new Error('User not found');
		}

		email = user.email;
	}

	const verification_code = await create_verification_code({ user_id });

	try {
		await mailer.sendMail({
			to: email,
			from: {
				name: env.EMAIL_FROM_NAME,
				address: env.EMAIL_FROM_ADDRESS,
			},
			subject: `Fontesio verification code: ${verification_code}`,
			html: render({ template: VerifyEmailTemplate, props: { verification_code } }),
			text: render({
				template: VerifyEmailTemplate,
				props: { verification_code },
				options: { plain_text: true },
			}),
		});
	} catch (e) {
		console.error(e);
		throw new Error('Could not send verification email');
	}
}
