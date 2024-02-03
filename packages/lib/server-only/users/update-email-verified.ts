import { db } from '@fontesio/drizzle';
import { users } from '@fontesio/drizzle/schema';
import { eq } from 'drizzle-orm';

interface UpdateEmailVerifiedOptions {
	user_id: string;
	email_verified: boolean;
}

export async function update_user_email_verified({
	user_id,
	email_verified,
}: UpdateEmailVerifiedOptions) {
	const [user] = await db
		.update(users)
		.set({ email_verified })
		.where(eq(users.id, user_id))
		.returning();

	if (!user) {
		throw new Error('User could not be updated');
	}

	return user;
}
