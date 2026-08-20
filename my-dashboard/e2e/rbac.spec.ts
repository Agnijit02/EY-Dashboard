import { expect, test } from '@playwright/test';

test.describe('Enterprise Role-Based Access Control', () => {
  test('Viewer user is prevented from mutating workspace projects', async ({ page }) => {
    await page.goto('/login');

    // Click Viewer demo quick-fill
    await page.getByRole('button', { name: /viewer/i }).click();
    await page.getByRole('button', { name: /sign in to workspace/i }).click();
    await expect(page).toHaveURL(/.*dashboard/);

    // Navigate to projects
    await page.goto('/projects');

    // Viewer role should not see "New Project" creation button
    await expect(page.getByRole('button', { name: /new project/i })).not.toBeVisible();
  });
});
