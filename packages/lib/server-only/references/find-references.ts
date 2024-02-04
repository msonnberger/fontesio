import { db } from '@fontesio/drizzle';
import { references } from '@fontesio/drizzle/schema';
import { count, eq } from 'drizzle-orm';
import type { FindResultSet } from '../../types/find-result-set';

interface FindReferencesOptions {
	user_id: string;
	page?: number;
	per_page?: number;
}

export async function find_references({ user_id, page = 1, per_page = 10 }: FindReferencesOptions) {
	const [data, [total]] = await Promise.all([
		db.query.references.findMany({
			where: (references, { eq }) => eq(references.user_id, user_id),
			orderBy: (references, { desc }) => desc(references.created_at),
			limit: per_page,
			offset: Math.max(page - 1, 0) * per_page,
		}),
		db.select({ value: count() }).from(references).where(eq(references.user_id, user_id)),
	]);

	return {
		data,
		count: total?.value ?? 0,
		page: Math.max(page, 1),
		per_page,
		total_pages: Math.ceil((total?.value ?? 0) / per_page),
	} satisfies FindResultSet<typeof data>;
}
