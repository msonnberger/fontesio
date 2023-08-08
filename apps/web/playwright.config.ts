import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const env_path = path.join(dir, '../../../.env');
dotenv.config({ path: env_path });

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
};

export default config;
