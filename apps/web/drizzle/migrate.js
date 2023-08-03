import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const env_path = path.join(dir, '../../../.env');
dotenv.config({ path: env_path });

// eslint-disable-next-line turbo/no-undeclared-env-vars
const migration_client = postgres(process.env.DATABASE_URL, { max: 1 });

migrate(drizzle(migration_client), { migrationsFolder: dir })
	.then(() => {
		console.log('Migrations applied');
		process.exit(0);
	})
	.catch(() => {
		console.log('Failed to apply migrations');
		process.exit(1);
	});
