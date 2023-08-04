import { RESEND_API_KEY } from '$env/static/private';
import { db } from '$lib/server/db';
import { email_verification_tokens } from '$lib/server/db/schema';
import { WEBAPP_URL } from '$lib/utils/constants';
import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export async function generate_verification_token(user_id: string) {
	const stored_user_tokens = await db
		.select()
		.from(email_verification_tokens)
		.where(eq(email_verification_tokens.user_id, user_id));

	if (stored_user_tokens.length > 0) {
		const reusable_stored_token = stored_user_tokens.find((token) =>
			isWithinExpiration(token.expires - EXPIRES_IN / 2),
		);

		if (reusable_stored_token) {
			return reusable_stored_token.id;
		}
	}

	const token = generateRandomString(64);
	await db.insert(email_verification_tokens).values({
		id: token,
		expires: Date.now() + EXPIRES_IN,
		user_id,
	});

	return token;
}

export async function validate_verification_token(token: string) {
	const stored_token = await db.transaction(async (tx) => {
		const [stored_token] = await tx
			.select()
			.from(email_verification_tokens)
			.where(eq(email_verification_tokens.id, token));

		if (!stored_token) {
			throw new Error('Invalid token');
		}

		await tx
			.delete(email_verification_tokens)
			.where(eq(email_verification_tokens.user_id, stored_token.user_id));

		return stored_token;
	});

	if (!isWithinExpiration(stored_token.expires)) {
		throw new Error('Token is expired');
	}

	return stored_token.user_id;
}

export async function send_verification_link(email: string, token: string) {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: 'Fontesio <verify@mail.fontesio.com>',
			to: [email],
			subject: 'Verify your email address',
			html: `
				<h1>Welcome to Fontesio!</h1>
				<p>To complete your account, please verify your email using the link below.</p>
				<a href="${WEBAPP_URL}/auth/verify-email/${token}">Verify Email</a>
			`,
		}),
	});

	if (!res.ok) {
		throw Error('Failed to send erification email');
	}
}
