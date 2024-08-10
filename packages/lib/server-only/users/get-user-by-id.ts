import { db } from '$lib';
interface GetUserByEmailOptions {
	id: string;
}

export async function get_user_by_id({ id }: GetUserByEmailOptions) {
	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, id),
	});

	return user ?? null;
}
