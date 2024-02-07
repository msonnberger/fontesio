import { env } from '@fontesio/env/server';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migration_client = postgres(env.DATABASE_URL, { max: 1, prepare: false });

migrate(drizzle(migration_client), { migrationsFolder: './migrations' })
	.then(() => {
		console.log('Migrations applied');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		console.log('Failed to apply migrations');
		process.exit(1);
	});
