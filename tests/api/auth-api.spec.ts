import { test, expect } from '../../src/fixtures/test';

// Uses the signed-in storageState: API calls share the browser session cookie.
test.describe('API - session', () => {
  test('current user endpoint responds for signed-in session', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');
    const response = await page.request.get('/web/index.php/api/v2/pim/employees?limit=1');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('data');
  });
});
