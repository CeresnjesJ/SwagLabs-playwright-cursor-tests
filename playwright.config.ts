import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for SauceDemo test automation
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is accidentally left in
  forbidOnly: !!process.env.CI,

  // Retry configuration
  retries: process.env.CI ? 2 : 0,

  // Worker configuration
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [['html', { open: 'never' }]],

  // Shared settings for all projects
  use: {
    // Base URL for navigation
    baseURL: 'https://www.saucedemo.com',

    // Configure test ID attribute for SauceDemo
    testIdAttribute: 'data-test',

    // Capture screenshot only on failure
    screenshot: 'only-on-failure',

    // Record video only on failure
    video: 'retain-on-failure',

    // Collect trace on first retry
    trace: 'on-first-retry',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
