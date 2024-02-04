import { db } from '@fontesio/drizzle';

interface GetAllReferencesByUserIdOptions {
	user_id: string;
}

export async function get_all_references_by_user_id({ user_id }: GetAllReferencesByUserIdOptions) {
	return db.query.references.findMany({
		where: (references, { eq }) => eq(references.user_id, user_id),
		orderBy: (references, { desc }) => desc(references.created_at),
	});
}

export type Reference = Awaited<ReturnType<typeof get_all_references_by_user_id>>[number];
