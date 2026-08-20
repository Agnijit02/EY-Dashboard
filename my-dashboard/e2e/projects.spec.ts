import { expect, test } from '@playwright/test';

test.describe('Projects Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /admin/i }).click();
    await page.getByRole('button', { name: /sign in to workspace/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('navigates to projects and lists portfolio items', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible();

    // Verify search filter input exists
    const searchInput = page.getByPlaceholder(/search projects/i);
    await expect(searchInput).toBeVisible();
  });
});
