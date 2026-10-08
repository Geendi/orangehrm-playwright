import { test, expect } from '../../src/fixtures/test';
import { env } from '../../src/config/env';
import { invalidLogins } from '../../src/data/employee';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('admin can log in with valid credentials @smoke', async ({ page, loginPage, dashboardPage }) => {
    await loginPage.login(env.adminUsername, env.adminPassword);
    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(dashboardPage.heading).toBeVisible();
  });

  for (const { title, username, password } of invalidLogins) {
    test(`shows error for ${title}`, async ({ page, loginPage }) => {
      await loginPage.login(username, password);
      await expect(loginPage.errorAlert).toContainText('Invalid credentials');
      await expect(page).toHaveURL(/auth\/login/);
    });
  }

  test('shows Required when both fields are empty', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expect.soft(loginPage.requiredMessageFor(loginPage.usernameInput)).toBeVisible();
    await expect.soft(loginPage.requiredMessageFor(loginPage.passwordInput)).toBeVisible();
  });

  test('password input masks its value', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('user can log out and lands on login page', async ({ page, loginPage, dashboardPage }) => {
    await loginPage.login(env.adminUsername, env.adminPassword);
    await expect(dashboardPage.heading).toBeVisible();
    await dashboardPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.heading).toBeVisible();
  });

  test('protected page redirects to login when signed out', async ({ page, loginPage }) => {
    await page.goto('/web/index.php/pim/viewEmployeeList');
    await expect(page).toHaveURL(/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('forgot password link opens reset page', async ({ page, loginPage }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/requestPasswordResetCode/);
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  });
});
