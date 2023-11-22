import type { CslJsonResource } from '@fontesio/lib/citations/schema';
import { generate_uuid_v7 } from '@fontesio/lib/uuid';
import {
	pgTable,
	uuid,
	text,
	bigint,
	uniqueIndex,
	boolean,
	jsonb,
	timestamp,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

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

const user_schema = createSelectSchema(users, {
	id: z.string().uuid(),
	email_verified: z.boolean(),
});

export type User = z.infer<typeof user_schema>;

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

export const email_verification_codes = pgTable(
	'email_verification_codes',
	{
		id: uuid('id').primaryKey(),
		code: text('code').notNull(),
		expires: bigint('expires', { mode: 'number' }).notNull(),
		user_id: uuid('user_id')
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
	id: uuid('id')
		.primaryKey()
		.$defaultFn(() => generate_uuid_v7()),
	created_at: timestamp('created_at').defaultNow().notNull(),
	updated_at: timestamp('updated_at').defaultNow().notNull(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	csl_json: jsonb('csl_json').$type<CslJsonResource>().notNull(),
});
