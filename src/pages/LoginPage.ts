import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Login' });
    // OrangeHRM labels are not programmatically linked to inputs, so the
    // placeholder is the most user-facing contract available.
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.getByRole('alert');
    this.forgotPasswordLink = page.getByText('Forgot your password?');
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.heading).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  requiredMessageFor(input: Locator): Locator {
    // the "Required" hint sits in the same form group as the input
    return this.page.locator('.oxd-input-group').filter({ has: input }).getByText('Required');
  }
}
