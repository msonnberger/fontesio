import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		// eslint-disable-next-line turbo/no-undeclared-env-vars
		connectionString: process.env.DATABASE_URL!,
	},
} satisfies Config;
