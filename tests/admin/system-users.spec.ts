import { test, expect } from '../../src/fixtures/test';
import { env } from '../../src/config/env';

test.describe('Admin - System Users', () => {
  test.beforeEach(async ({ adminPage }) => {
    await adminPage.goto();
  });

  test('can find the Admin user by username @smoke', async ({ adminPage }) => {
    await adminPage.searchByUsername(env.adminUsername);
    await expect(adminPage.rowFor(env.adminUsername).first()).toBeVisible();
  });

  test('unknown username shows No Records Found', async ({ adminPage }) => {
    await adminPage.searchByUsername(`ghost_${Date.now()}`);
    await adminPage.expectToast('No Records Found');
  });

  test('reset clears the username filter', async ({ adminPage }) => {
    await adminPage.usernameSearch.fill('something');
    await adminPage.resetButton.click();
    await expect(adminPage.usernameSearch).toHaveValue('');
  });
});
