import { db } from '@fontesio/drizzle';
import { resources } from '@fontesio/drizzle/schema';
import type { CslJsonResource } from '@fontesio/citations/types';

interface CreateResourceOptions {
	user_id: string;
	csl_json: CslJsonResource;
}

export async function create_resource({ user_id, csl_json }: CreateResourceOptions) {
	return db.insert(resources).values({ user_id, csl_json }).returning();
}
