import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Eagle Eye Networks Preview App');
  await expect(page.locator('h2')).toHaveText('Eagle Eye Networks Camera Preview');
})
