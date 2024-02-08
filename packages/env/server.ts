import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		DATABASE_SSL_CERT: z.string().optional(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
		SMTP_HOST: z.string(),
		SMTP_PORT: z.coerce.number(),
		SMTP_USERNAME: z.string(),
		SMTP_PASSWORD: z.string(),
		SMTP_SECURE: z.coerce.boolean(),
		EMAIL_FROM_NAME: z.string(),
		EMAIL_FROM_ADDRESS: z.string().email(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	isServer: typeof window === 'undefined',
});
