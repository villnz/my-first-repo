import { test, expect } from '@playwright/test';

test('UI: Homepage loads @ui', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});

test('UI: Heading visible @ui', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toBeVisible();
});

test('API: Get users @api', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  expect(response.ok()).toBeTruthy();
});

test('API: Get specific user @api', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
  expect(response.status()).toBe(200);
  const user = await response.json();
  expect(user.id).toBe(1);
});