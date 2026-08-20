import { expect, test } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('renders login page with enterprise branding', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(page.getByLabel(/work email/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
  });

  test('populates credentials on 1-click admin demo button and logs in', async ({ page }) => {
    await page.goto('/login');

    // Click Admin demo quick-fill
    await page.getByRole('button', { name: /admin/i }).click();

    // Verify fields populated
    await expect(page.getByLabel(/work email/i)).toHaveValue('admin@enterprise.demo');
    await expect(page.getByLabel(/^password$/i)).toHaveValue('Password123!');

    // Submit form
    await page.getByRole('button', { name: /sign in to workspace/i }).click();

    // Expect navigation to workspace dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
