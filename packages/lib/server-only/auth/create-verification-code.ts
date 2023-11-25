import { db } from '@fontesio/drizzle';
import { email_verification_codes } from '@fontesio/drizzle/schema';
import { eq } from 'drizzle-orm';
import { generateRandomString } from 'lucia/utils';

interface CreateVerificationCodeOptions {
	user_id: string;
}

export async function create_verification_code({ user_id }: CreateVerificationCodeOptions) {
	const code = generateRandomString(6, '0123456789');

	await db.transaction(async (tx) => {
		await tx.delete(email_verification_codes).where(eq(email_verification_codes.user_id, user_id));

		await tx.insert(email_verification_codes).values({
			code,
			expires: Date.now() + 1000 * 60 * 5, // 5 minutes
			user_id,
		});
	});

	return code;
}
