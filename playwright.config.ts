import type { PlaywrightTestConfig } from '@playwright/test';

require('dotenv').config();

const config: PlaywrightTestConfig = {
  retries: Number(process.env.RETRIES),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', {open: 'never', outputFolder: 'test-results/html-report' }]],
  use: {
    viewport: {width: 1920, height: 1080},
    baseURL: process.env.BASE_URL,
    headless: true,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/artifacts/',
};
export default config;