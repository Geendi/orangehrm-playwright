import { test, expect } from '../../src/fixtures/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('shows dashboard heading for signed-in admin @smoke', async ({ dashboardPage }) => {
    await expect(dashboardPage.heading).toBeVisible();
  });

  test('shows main side menu items', async ({ dashboardPage }) => {
    for (const item of ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Directory']) {
      await expect.soft(dashboardPage.sideMenuLink(item)).toBeVisible();
    }
  });

  test('side menu search filters items', async ({ dashboardPage }) => {
    await dashboardPage.sideMenuSearch.fill('PIM');
    await expect(dashboardPage.sideMenuLink('PIM')).toBeVisible();
    await expect(dashboardPage.sideMenuLink('Admin')).toBeHidden();
  });

  test('shows Time at Work widget', async ({ dashboardPage }) => {
    await expect(dashboardPage.widget('Time at Work')).toBeVisible();
  });
});
