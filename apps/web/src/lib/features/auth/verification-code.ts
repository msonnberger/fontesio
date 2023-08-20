import VerificationCode from '$lib/emails/templates/VerificationCode.svelte';
import { db } from '$lib/server/db';
import { email_verification_codes } from '$lib/server/db/schema';
import { resend } from '$lib/server/resend';
import { generate_uuid_v7 } from '$lib/utils/uuid';
import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { render } from 'svelte-email';

export async function generate_verification_code(user_id: string) {
	const code = generateRandomString(6, '0123456789');

	await db.transaction(async (tx) => {
		await tx.delete(email_verification_codes).where(eq(email_verification_codes.user_id, user_id));

		await tx.insert(email_verification_codes).values({
			id: generate_uuid_v7(),
			code,
			expires: Date.now() + 1000 * 60 * 5, // 5 minutes
			user_id,
		});
	});

	return code;
}

export async function validate_verification_code(user_id: string, code: string) {
	const stored_code = await db.transaction(async (tx) => {
		const [stored_code] = await tx
			.select()
			.from(email_verification_codes)
			.where(eq(email_verification_codes.user_id, user_id));

		if (!stored_code || stored_code.code !== code) {
			throw new Error('Invalid verification code');
		}

		await tx
			.delete(email_verification_codes)
			.where(eq(email_verification_codes.id, stored_code.id));

		return stored_code;
	});

	if (!isWithinExpiration(stored_code.expires)) {
		throw new Error('Verification code is expired');
	}

	return stored_code.user_id;
}

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
