import { env } from '$env/dynamic/public';

export const WEBAPP_URL = env.PUBLIC_WEBAPP_URL ?? 'http://localhost:3000';
