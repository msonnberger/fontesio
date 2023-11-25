import { db } from '@fontesio/drizzle';
import { NotFoundError } from '../../errors/not-found-error';

interface GetUserByEmailOptions {
	email: string;
}

export async function get_user_by_email({ email }: GetUserByEmailOptions) {
	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email),
	});

	if (user === undefined) {
		throw new NotFoundError('User not found');
	}

	return user;
}
