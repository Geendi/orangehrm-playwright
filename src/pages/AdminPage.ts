import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  readonly systemUsersHeading: Locator;
  readonly usernameSearch: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly resultsTable: Locator;
  readonly recordsFound: Locator;

  constructor(page: Page) {
    super(page);
    this.systemUsersHeading = page.getByRole('heading', { name: 'System Users' });
    this.usernameSearch = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).getByRole('textbox');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.resultsTable = page.getByRole('table');
    this.recordsFound = page.getByText(/Record(s)? Found/);
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/admin/viewSystemUsers');
    await expect(this.systemUsersHeading).toBeVisible();
  }

  async searchByUsername(username: string): Promise<void> {
    await this.usernameSearch.fill(username);
    await this.searchButton.click();
  }

  rowFor(username: string): Locator {
    return this.resultsTable.getByRole('row').filter({ hasText: username });
  }
}
