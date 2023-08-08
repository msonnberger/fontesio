import { expect } from '@playwright/test';
import { test } from './lib/fixtures';

test('index page redirects to login page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
});
