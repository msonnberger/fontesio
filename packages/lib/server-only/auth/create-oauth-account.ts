import { db } from '@fontesio/drizzle';
import { oauth_accounts } from '@fontesio/drizzle/schema';

interface CreateOauthAccountOptions {
	provider_id: string;
	provider_user_id: string;
	user_id: string;
}

export async function create_oauth_account(options: CreateOauthAccountOptions) {
	const [oauth_account] = await db.insert(oauth_accounts).values(options).returning();

	if (!oauth_account) {
		throw new Error('Could not create OAuth account');
	}

	return oauth_account;
}
