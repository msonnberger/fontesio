import type { CslJsonReference } from '@fontesio/citations/types';
import { db } from '@fontesio/drizzle';
import { generate_id } from '@fontesio/drizzle/id';
import { references } from '@fontesio/drizzle/schema';

interface CreateReferenceOptions {
	user_id: string;
	csl_json: CslJsonReference;
}

export async function create_reference({ user_id, csl_json }: CreateReferenceOptions) {
	csl_json.id = generate_id('reference');

	return db.insert(references).values({ id: csl_json.id, user_id, csl_json }).returning();
}
