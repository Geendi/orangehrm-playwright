import { test as setup, expect } from '../src/fixtures/test';
import { env } from '../src/config/env';
import { STORAGE_STATE } from '../playwright.config';

// Log in once and reuse the session: https://playwright.dev/docs/auth
setup('authenticate as admin', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login(env.adminUsername, env.adminPassword);
  await expect(page).toHaveURL(/dashboard/);
  await expect(dashboardPage.heading).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE });
});
