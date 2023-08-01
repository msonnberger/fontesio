import { pgTable, uuid, text, bigint } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	email: text('email').notNull(),
});

export const user_keys = pgTable('user_keys', {
	id: text('id').primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => users.id),
	hashed_password: text('hashed_password'),
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => users.id),
	active_expires: bigint('active_expires', { mode: 'bigint' }).notNull(),
	idle_expires: bigint('idle_expires', { mode: 'bigint' }).notNull(),
});
