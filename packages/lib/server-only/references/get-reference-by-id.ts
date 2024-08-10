import { db } from '$lib';

interface GetReferenceByIdOptions {
	id: string;
	user_id: string;
}

export async function get_reference_by_id({ id, user_id }: GetReferenceByIdOptions) {
	const reference = await db.query.references.findFirst({
		where: (references, { eq, and }) => and(eq(references.id, id), eq(references.user_id, user_id)),
	});

	return reference ?? null;
}
