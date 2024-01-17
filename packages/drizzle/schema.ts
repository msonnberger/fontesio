import type { CslJsonResource } from '@fontesio/citations/types';
import { bigint, boolean, jsonb, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { generate_id } from './id';

export const users = pgTable(
	'users',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => generate_id('user')),
		email: text('email').notNull(),
		email_verified: boolean('email_verified').notNull().default(false),
	},
	(table) => {
		return {
			email_idx: uniqueIndex('email_idx').on(table.email),
		};
	},
);

const user_schema = createSelectSchema(users, {
	id: z.string(),
	email_verified: z.boolean(),
});

export type User = z.infer<typeof user_schema>;

export const user_keys = pgTable('user_keys', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	hashed_password: text('hashed_password'),
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	active_expires: bigint('active_expires', { mode: 'number' }).notNull(),
	idle_expires: bigint('idle_expires', { mode: 'number' }).notNull(),
});

export const email_verification_codes = pgTable(
	'email_verification_codes',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => generate_id('verification')),
		code: text('code').notNull(),
		expires: bigint('expires', { mode: 'number' }).notNull(),
		user_id: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
	},
	(table) => {
		return {
			user_id_idx: uniqueIndex('user_id_idx').on(table.user_id),
		};
	},
);

export const resources = pgTable('resources', {
	id: text('id').primaryKey(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	updated_at: timestamp('updated_at').defaultNow().notNull(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	csl_json: jsonb('csl_json').$type<CslJsonResource>().notNull(),
});
