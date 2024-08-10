import { db } from '$lib';
import { email_verification_codes } from '@fontesio/drizzle/schema';
import { eq } from 'drizzle-orm';
import { TimeSpan, createDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';

interface CreateVerificationCodeOptions {
	user_id: string;
}

export async function create_verification_code({ user_id }: CreateVerificationCodeOptions) {
	const code = generateRandomString(6, alphabet('0-9'));

	await db.transaction(async (tx) => {
		await tx.delete(email_verification_codes).where(eq(email_verification_codes.user_id, user_id));

		await tx.insert(email_verification_codes).values({
			code,
			expires_at: createDate(new TimeSpan(5, 'm')),
			user_id,
		});
	});

	return code;
}
