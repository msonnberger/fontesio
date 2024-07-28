import {
	SMTP_HOST,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_SECURE,
	SMTP_USERNAME,
} from '$env/static/private';
import { create_mailer, render } from '@fontesio/email';
import VerifyEmailTemplate from '@fontesio/email/templates/verify-email';
import { get_user_by_id } from '../users/get-user-by-id';
import { create_verification_code } from './create-verification-code';

interface SendVerificationEmail {
	user_id: string;
	email?: string;
	webapp_url: string;
	marketing_url: string;
	from: {
		name: string;
		address: string;
	};
}

export async function send_verification_email({
	user_id,
	email,
	webapp_url,
	marketing_url,
	from,
}: SendVerificationEmail) {
	if (!email) {
		const user = await get_user_by_id({ id: user_id });

		if (!user) {
			throw new Error('User not found');
		}

		email = user.email;
	}

	const verification_code = await create_verification_code({ user_id });

	try {
		const mailer = create_mailer({
			host: SMTP_HOST,
			port: Number(SMTP_PORT),
			secure: Boolean(SMTP_SECURE),
			auth: {
				user: SMTP_USERNAME,
				pass: SMTP_PASSWORD,
			},
		});
		await mailer.sendMail({
			to: email,
			from: from,
			subject: `Fontesio verification code: ${verification_code}`,
			html: render({
				template: VerifyEmailTemplate,
				props: { verification_code, webapp_url, marketing_url },
			}),
			text: render({
				template: VerifyEmailTemplate,
				props: { verification_code, webapp_url, marketing_url },
				options: { plain_text: true },
			}),
		});
	} catch (e) {
		throw new Error('Could not send verification email');
	}
}
