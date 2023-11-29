import { db } from '@fontesio/drizzle';
import { NotFoundError } from '../../errors/not-found-error';

interface GetUserByEmailOptions {
	id: string;
}

export async function get_user_by_id({ id }: GetUserByEmailOptions) {
	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, id),
	});

	if (user === undefined) {
		throw new NotFoundError('User not found');
	}

	return user;
}
