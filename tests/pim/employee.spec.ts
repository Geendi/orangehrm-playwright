import { test, expect } from '../../src/fixtures/test';
import { buildEmployee } from '../../src/data/employee';

test.describe('PIM - Employees', () => {
  test.beforeEach(async ({ pimPage }) => {
    await pimPage.goto();
  });

  test('admin can add a new employee @smoke', async ({ pimPage }) => {
    const employee = buildEmployee();
    await pimPage.addEmployee(employee);

    await pimPage.expectToast('Successfully Saved');
    await expect(pimPage.personalDetailsHeading).toBeVisible();
    await expect(pimPage.page.getByRole('heading', { name: `${employee.firstName} ${employee.lastName}` })).toBeVisible();
  });

  test('added employee can be found via search', async ({ pimPage }) => {
    const employee = buildEmployee();
    await pimPage.addEmployee(employee);
    await expect(pimPage.personalDetailsHeading).toBeVisible();

    await pimPage.goto();
    await pimPage.searchByName(employee.lastName);
    await expect(pimPage.rowContaining(employee.lastName)).toBeVisible();
  });

  test('first and last name are required', async ({ pimPage }) => {
    await pimPage.addButton.click();
    await pimPage.saveButton.click();
    await expect(pimPage.page.getByText('Required')).toHaveCount(2);
  });

  test('searching an unknown name shows No Records Found', async ({ pimPage }) => {
    await pimPage.searchByName(`Nobody${Date.now()}`);
    await pimPage.expectToast('No Records Found');
  });
});
