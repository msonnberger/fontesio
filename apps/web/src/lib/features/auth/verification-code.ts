import VerificationCode from '$lib/emails/templates/VerificationCode.svelte';
import { resend } from '$lib/server/resend';
import { render } from 'svelte-email';

export async function send_verification_code(email: string, code: string) {
	try {
		await resend.emails.send({
			from: 'Fontesio <verify@mail.fontesio.com>',
			to: [email],
			subject: `Fontesio verification code: ${code}`,
			html: render({
				template: VerificationCode,
				props: {
					verification_code: code,
				},
			}),
		});
	} catch {
		throw Error('Failed to send verification email');
	}
}
