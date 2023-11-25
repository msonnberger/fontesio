import { db } from '@fontesio/drizzle';
import { users } from '@fontesio/drizzle/schema';

interface CreateUserOptions {
	email: string;
	email_verified?: boolean;
}

export async function create_user({ email, email_verified }: CreateUserOptions) {
	const [user] = await db.insert(users).values({ email, email_verified }).returning();

	if (!user) {
		throw new Error('User could not be created');
	}

	return user;
}
