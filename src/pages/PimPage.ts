import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { Employee } from '../data/employee';

export class PimPage extends BasePage {
  readonly addButton: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly searchButton: Locator;
  readonly employeeNameSearch: Locator;
  readonly resultsTable: Locator;
  readonly personalDetailsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.employeeNameSearch = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Name' })
      .getByPlaceholder('Type for hints...');
    this.resultsTable = page.getByRole('table');
    this.personalDetailsHeading = page.getByRole('heading', { name: 'Personal Details' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await expect(this.addButton).toBeVisible();
  }

  async addEmployee(employee: Employee): Promise<void> {
    await this.addButton.click();
    await this.firstNameInput.fill(employee.firstName);
    if (employee.middleName) await this.middleNameInput.fill(employee.middleName);
    await this.lastNameInput.fill(employee.lastName);
    await this.saveButton.click();
  }

  async searchByName(name: string): Promise<void> {
    await this.employeeNameSearch.fill(name);
    await this.searchButton.click();
  }

  rowContaining(text: string): Locator {
    return this.resultsTable.getByRole('row').filter({ hasText: text });
  }
}
