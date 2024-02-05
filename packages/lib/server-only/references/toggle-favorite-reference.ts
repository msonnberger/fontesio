import { db } from '@fontesio/drizzle';
import { references } from '@fontesio/drizzle/schema';
import { and, eq } from 'drizzle-orm';

interface ToggleFavoriteReferenceOptions {
	id: string;
	user_id: string;
}

export async function toggle_favorite_reference({ id, user_id }: ToggleFavoriteReferenceOptions) {
	const reference = await db.query.references.findFirst({
		where: and(eq(references.id, id), eq(references.user_id, user_id)),
		columns: { is_favorite: true },
	});

	if (!reference) {
		throw new Error('Reference not found');
	}

	return db
		.update(references)
		.set({
			is_favorite: !reference.is_favorite,
		})
		.where(and(eq(references.id, id), eq(references.user_id, user_id)));
}
