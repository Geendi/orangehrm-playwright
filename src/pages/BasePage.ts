import { type Locator, type Page, expect } from '@playwright/test';

/** Shared layout: side menu, top bar, toasts. */
export abstract class BasePage {
  readonly page: Page;
  readonly topbarHeader: Locator;
  readonly userDropdown: Locator;
  readonly logoutMenuItem: Locator;
  readonly sideMenuSearch: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topbarHeader = page.getByRole('banner').getByRole('heading');
    this.userDropdown = page.getByRole('banner').getByRole('listitem').filter({ has: page.getByRole('img', { name: 'profile picture' }) });
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' });
    this.sideMenuSearch = page.getByRole('navigation').getByPlaceholder('Search');
    this.toast = page.locator('#oxd-toaster_1');
  }

  sideMenuLink(name: string): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name, exact: true });
  }

  async navigateTo(menu: string): Promise<void> {
    await this.sideMenuLink(menu).click();
    await expect(this.topbarHeader.first()).toContainText(menu);
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutMenuItem.click();
  }

  async expectToast(text: string | RegExp): Promise<void> {
    await expect(this.toast).toContainText(text);
  }
}
