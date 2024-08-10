import { db } from '$lib';

interface GetUserByEmailOptions {
	email: string;
}

export async function get_user_by_email({ email }: GetUserByEmailOptions) {
	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, email),
	});

	return user ?? null;
}
