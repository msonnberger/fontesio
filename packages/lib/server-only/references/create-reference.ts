import type { CslJsonReference } from '@fontesio/citations/types';
import { db } from '@fontesio/drizzle';
import { generate_id } from '@fontesio/drizzle/id';
import { references } from '@fontesio/drizzle/schema';

interface CreateReferenceOptions {
	user_id: string;
	csl_json: CslJsonReference;
}

export async function create_reference({ user_id, csl_json }: CreateReferenceOptions) {
	const id = generate_id('reference');

	csl_json.id = id;

	return db.insert(references).values({ id, user_id, csl_json }).returning();
}
