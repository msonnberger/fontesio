import type { CslJsonReference } from '@fontesio/citations/types';
import { relations } from 'drizzle-orm';
import {
	boolean,
	jsonb,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
} from 'drizzle-orm/pg-core';
import { generate_id } from './id';

export const users = pgTable(
	'users',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => generate_id('user')),
		email: text('email').notNull(),
		email_verified: boolean('email_verified').notNull().default(false),
		hashed_password: text('hashed_password'),
	},
	(table) => {
		return {
			email_idx: uniqueIndex('email_idx').on(table.email),
		};
	},
);

export const users_relations = relations(users, ({ many }) => ({
	oauth_accounts: many(oauth_accounts),
}));

export type User = typeof users.$inferSelect;

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const oauth_accounts = pgTable(
	'oauth_accounts',
	{
		provider_id: text('provider_id').notNull(),
		provider_user_id: text('provider_user_id').notNull(),
		user_id: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.provider_id, table.provider_user_id] }),
		};
	},
);

export const email_verification_codes = pgTable(
	'email_verification_codes',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => generate_id('verification')),
		code: text('code').notNull(),
		expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
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

export const references = pgTable('references', {
	id: text('id').primaryKey(),
	created_at: timestamp('created_at').defaultNow().notNull(),
	updated_at: timestamp('updated_at').defaultNow().notNull(),
	user_id: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	csl_json: jsonb('csl_json').$type<CslJsonReference>().notNull(),
	deleted_at: timestamp('deleted_at', { withTimezone: true }),
	is_favorite: boolean('is_favorite').notNull().default(false),
});

export type Reference = typeof references.$inferSelect;
