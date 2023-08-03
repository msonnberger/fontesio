import { pgTable, uuid, text, bigint, uniqueIndex, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable(
	'users',
	{
		id: uuid('id').primaryKey(),
		email: text('email').notNull(),
		email_verified: boolean('email_verified').notNull().default(false),
	},
	(table) => {
		return {
			email_idx: uniqueIndex('email_idx').on(table.email),
		};
	},
);

export const user_keys = pgTable('user_keys', {
	id: text('id').primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	hashed_password: text('hashed_password'),
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	active_expires: bigint('active_expires', { mode: 'number' }).notNull(),
	idle_expires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

export const email_verification_tokens = pgTable('email_verification_tokens', {
	id: text('id').primaryKey(),
	expires: bigint('expires', { mode: 'number' }).notNull(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
});
