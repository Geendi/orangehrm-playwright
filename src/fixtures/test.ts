import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';
import { AdminPage } from '../pages/AdminPage';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  adminPage: AdminPage;
};

/** Page objects injected as fixtures: https://playwright.dev/docs/test-fixtures */
export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  pimPage: async ({ page }, use) => use(new PimPage(page)),
  adminPage: async ({ page }, use) => use(new AdminPage(page)),
});

export { expect } from '@playwright/test';
