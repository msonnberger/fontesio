import { env } from '@fontesio/env/server';
import type { Config } from 'drizzle-kit';

export default ({
	schema: './schema.ts',
	out: './migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
} satisfies Config);
