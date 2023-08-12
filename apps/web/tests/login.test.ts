import { expect } from '@playwright/test';
import { test } from './lib/fixtures';
import { login } from './fixtures/users';

test.describe.configure({ mode: 'parallel' });

test('index page redirects to login page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Sign in to your account')).toBeVisible();
});

test('user can login & logout successfully', async ({ page, users }) => {
	await test.step('login', async () => {
		const user = await users.create();
		await user.login();
		await expect(page.getByText(user.email)).toBeVisible();
	});

	await test.step('logout', async () => {
		await page.locator('#user-menu-trigger').click();
		await page.locator('a[href="/logout"]').click();
		await expect(page.locator('#email-password-form')).toBeVisible();
	});

	await users.delete_all();
});

test.describe('Login flow validations', async () => {
	test('Should warn when user does not exist', async ({ page }) => {
		// Login with a non-existent user
		await login({ email: 'never@example.com' }, page);
		await expect(page.getByText('We do not recognize that email or password.')).toBeVisible();
	});

	test('Should warn when password is incorrect', async ({ page, users }) => {
		const user = await users.create();
		await login({ email: user.email, password: 'wrong' }, page);
		await expect(page.getByText('We do not recognize that email or password.')).toBeVisible();
		await user.delete();
	});
});
