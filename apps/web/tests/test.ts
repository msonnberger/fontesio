import { expect, test } from '@playwright/test';

test('index page redirects to login page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
});
