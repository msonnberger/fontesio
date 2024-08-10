import { db } from '$lib';
import { references } from '@fontesio/drizzle/schema';
import { and, eq } from 'drizzle-orm';

interface DeleteReferenceOptions {
	id: string;
	user_id: string;
}

export async function delete_reference({ id, user_id }: DeleteReferenceOptions) {
	return db
		.update(references)
		.set({
			deleted_at: new Date(),
		})
		.where(and(eq(references.id, id), eq(references.user_id, user_id)));
}
