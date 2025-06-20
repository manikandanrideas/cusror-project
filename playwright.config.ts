import { defineConfig, devices } from '@playwright/test';
import { devConfig } from './src/config/dev.config';
import { qaConfig } from './src/config/qa.config';
import { prodConfig } from './src/config/prod.config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// Get environment from command line or default to dev
const env = process.env.TEST_ENV?.toLowerCase() || 'dev';
const configs = {
    dev: devConfig,
    qa: qaConfig,
    prod: prodConfig
};

// Get the appropriate config based on environment
const config = configs[env as keyof typeof configs] || configs.dev;

console.log(`Using environment: ${env}`);
console.log(`Base URL: ${config.baseUrl}`);

export default defineConfig({
  testDir: './src/tests',
  timeout: config.timeout,
  retries: config.retries,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: config.baseUrl,
    headless: process.env.HEADLESS === 'true',
    viewport: config.viewport,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    }
  ],
  outputDir: 'test-results/',
  preserveOutput: 'always',
});
