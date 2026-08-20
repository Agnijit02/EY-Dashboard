import { expect, test } from '@playwright/test';

test.describe('Dashboard Workspace', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /admin/i }).click();
    await page.getByRole('button', { name: /sign in to workspace/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('displays key executive metrics and charts', async ({ page }) => {
    await expect(page.getByText(/total revenue/i)).toBeVisible();
    await expect(page.getByText(/portfolio health/i)).toBeVisible();
    await expect(page.getByText(/active projects/i)).toBeVisible();
  });
});
