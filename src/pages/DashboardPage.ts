import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/dashboard/index');
    await expect(this.heading).toBeVisible();
  }

  widget(title: string): Locator {
    return this.page.locator('.orangehrm-dashboard-widget').filter({ hasText: title });
  }
}
