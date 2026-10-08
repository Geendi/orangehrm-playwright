# OrangeHRM Playwright Framework

End-to-end tests for the [OrangeHRM demo](https://opensource-demo.orangehrmlive.com) built on the [Playwright best practices](https://playwright.dev/docs/best-practices).

## Structure

```
├── playwright.config.ts      # projects, retries, traces, reporters
├── src/
│   ├── config/env.ts         # env-driven settings (.env)
│   ├── data/                 # test data builders (unique per test)
│   ├── fixtures/test.ts      # page objects injected as fixtures
│   └── pages/                # Page Object Model
├── tests/
│   ├── auth.setup.ts         # logs in once, saves storageState
│   ├── auth/                 # login/logout (run logged-out)
│   ├── dashboard/
│   ├── pim/
│   ├── admin/
│   └── api/
└── .github/workflows/        # CI: typecheck, lint, sharded tests
```

## How best practices are applied

| Practice | Where |
|---|---|
| Test user-visible behavior, user-facing locators (`getByRole`, `getByPlaceholder`) | `src/pages/*` |
| Chaining & filtering locators | `rowFor`, `requiredMessageFor`, `widget` |
| Web-first assertions only (`await expect(...).toBeVisible()`) | all specs |
| Soft assertions for multi-checks | dashboard menu, login "Required" |
| Isolation: own context per test, unique data per test | `buildEmployee()` |
| Log in once via setup project + `storageState` | `tests/auth.setup.ts` |
| Cross-browser projects | `playwright.config.ts` |
| Traces on first retry, screenshots/video on failure | `playwright.config.ts` |
| TypeScript + ESLint `no-floating-promises` + `tsc --noEmit` | `eslint.config.mjs`, CI |
| CI on Linux, only Chromium installed, sharding | `.github/workflows/playwright.yml` |
| Parallel by default (`fullyParallel`) | `playwright.config.ts` |

## Run

```bash
npm install
npx playwright install
cp .env.example .env

npm test                 # all browsers
npm run test:chromium    # chromium only
npm run test:smoke       # @smoke tagged
npm run test:ui          # UI mode
npm run test:debug       # inspector
npm run report           # open HTML report
npm run codegen          # pick locators
```

> The demo site is shared and public, so data changes from other users can occasionally cause flakiness.
