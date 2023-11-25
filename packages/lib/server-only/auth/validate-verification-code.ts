import { db } from '@fontesio/drizzle';
import { email_verification_codes } from '@fontesio/drizzle/schema';
import { eq } from 'drizzle-orm';
import { isWithinExpiration } from 'lucia/utils';

interface ValidateVerificationCodeOptions {
	user_id: string;
	code: string;
}

export async function validate_verification_code({
	user_id,
	code,
}: ValidateVerificationCodeOptions) {
	const stored_code = await db.transaction(async (tx) => {
		const stored_code = await tx.query.email_verification_codes.findFirst({
			where: (email_verification_codes, { eq }) => eq(email_verification_codes.user_id, user_id),
		});

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
