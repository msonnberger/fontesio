import type { CslJsonReference } from '@fontesio/citations/types';
import { db } from '@fontesio/drizzle';
import { references } from '@fontesio/drizzle/schema';
import { and, eq } from 'drizzle-orm';

interface UpdateReferenceOptions {
	id: string;
	user_id: string;
	csl_json: CslJsonReference;
}

export async function update_reference({ id, user_id, csl_json }: UpdateReferenceOptions) {
	return db
		.update(references)
		.set({ csl_json })
		.where(and(eq(references.id, id), eq(references.user_id, user_id)));
}
