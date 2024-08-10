import { db } from '$lib';
import { users } from '@fontesio/drizzle/schema';
import { eq } from 'drizzle-orm';
import { hash_password } from '../../lucia/password';

interface UpdatePasswordOptions {
	user_id: string;
	password: string;
}

export async function update_user_password({ user_id, password }: UpdatePasswordOptions) {
	const [user] = await db
		.update(users)
		.set({ hashed_password: await hash_password(password) })
		.where(eq(users.id, user_id))
		.returning();

	if (!user) {
		throw new Error('Password could not be updated');
	}

	return user;
}
