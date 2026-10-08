import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/admin.json');

/**
 * Config follows https://playwright.dev/docs/best-practices:
 * - tests isolated, parallel by default
 * - login once in a setup project, reuse storageState
 * - cross-browser projects
 * - traces on first retry (CI debugging), not on every test
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['list'], ['github']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // Login tests must start logged-out, so they skip the stored state.
    {
      name: 'auth-tests',
      testMatch: /auth\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'chromium',
      testIgnore: /auth\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      testIgnore: /auth\/.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'], storageState: STORAGE_STATE },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testIgnore: /auth\/.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'], storageState: STORAGE_STATE },
      dependencies: ['setup'],
    },
  ],
});
