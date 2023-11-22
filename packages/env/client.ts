import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	clientPrefix: 'PUBLIC_',
	client: {
		PUBLIC_WEBAPP_URL: z.string().url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
