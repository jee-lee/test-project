import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testIgnore: 'tests/api/**/*',
  testMatch: 'tests/ui/**/*.spec.js',
  reporter: [['html', { outputFolder: 'report/ui' }]],
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
