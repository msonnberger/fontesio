import { db } from '@fontesio/drizzle';

interface GetOAuthAccountsByUserIdOptions {
	user_id: string;
	provider_id: string;
}

export async function get_oauth_account({ user_id, provider_id }: GetOAuthAccountsByUserIdOptions) {
	const oauth_account = await db.query.oauth_accounts.findFirst({
		where: (table, { eq, and }) =>
			and(eq(table.user_id, user_id), eq(table.provider_id, provider_id)),
	});

	return oauth_account ?? null;
}
