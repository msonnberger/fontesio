// place files you want to import through the `$lib` alias in this folder.

import { env } from '$env/dynamic/private';
import { create_db } from '@fontesio/drizzle';
import { create_lucia } from '@fontesio/lib/lucia/auth';

export const db = create_db({
	database_url: env.DATABASE_URL,
	ssl_cert: env.DATABASE_SSL_CERT,
});

export const lucia = create_lucia(db);
