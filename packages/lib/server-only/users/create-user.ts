import { db } from '$lib';
import { oauth_accounts, users } from '@fontesio/drizzle/schema';
import { hash_password } from '../../lucia/password';

type CreateUserOptions =
	| {
			idendity_provider: 'fontesio';
			email: string;
			email_verified: boolean;
			password: string;
	  }
	| {
			idendity_provider: 'google';
			email: string;
			email_verified?: boolean;
			provider_user_id: string;
	  };

export async function create_user(options: CreateUserOptions) {
	if (options.idendity_provider === 'fontesio') {
		const [user] = await db
			.insert(users)
			.values({
				email: options.email,
				email_verified: options.email_verified,
				hashed_password: await hash_password(options.password),
			})
			.returning();

		if (!user) {
			throw new Error('User could not be created');
		}

		return user;
	}

	const user = await db.transaction(async (tx) => {
		const [new_user] = await tx
			.insert(users)
			.values({
				email: options.email,
				email_verified: options.email_verified,
			})
			.returning();

		if (!new_user) {
			throw new Error('User could not be created');
		}

		await tx.insert(oauth_accounts).values({
			user_id: new_user.id,
			provider_id: options.idendity_provider,
			provider_user_id: options.provider_user_id,
		});

		return new_user;
	});

	return user;
}
