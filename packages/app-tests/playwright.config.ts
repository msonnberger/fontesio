import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	forbidOnly: !!process.env.CI,
	testDir: 'playwright',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	webServer: {
		command: 'cd ../../apps/web && pnpm build && pnpm preview',
		port: 3000,
	},
};

export default config;
