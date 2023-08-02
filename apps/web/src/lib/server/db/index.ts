import { WebSocket } from 'undici';
import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DATABASE_URL } from '$env/static/private';

neonConfig.webSocketConstructor = WebSocket;
export const pool = new Pool({ connectionString: DATABASE_URL });
const sql = neon(DATABASE_URL);
export const db = drizzle(sql);
