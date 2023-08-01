import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		host: 'ep-fancy-river-56047966.eu-central-1.aws.neon.tech',
		password: 'scdqeRt08Okg',
		user: 'msonnberger',
		database: 'neondb',
	},
} satisfies Config;
