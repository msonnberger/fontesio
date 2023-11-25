import { db } from '@fontesio/drizzle';

interface GetAllResourcesByUserIdOptions {
	user_id: string;
}

export async function get_all_resources_by_user_id({ user_id }: GetAllResourcesByUserIdOptions) {
	return db.query.resources.findMany({
		where: (resources, { eq }) => eq(resources.user_id, user_id),
	});
}
