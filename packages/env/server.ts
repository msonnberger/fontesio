import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import { BROWSER } from 'esm-env';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		RESEND_API_KEY: z.string(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	isServer: !BROWSER,
});
