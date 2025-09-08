import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:4173',
    browserName: 'chromium',
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    timezoneId: 'America/New_York',
    // keep screenshots small & stable:
    screenshot: 'off',
  },
  expect: {
    toHaveScreenshot: {
      // perceptual diff in YIQ color space (default 0.2); tweak if fonts AA differ
      threshold: 0.4,
      // or cap by pixel ratio if needed:
      // maxDiffPixelRatio: 0.003,
      scale: 'css',
    },
    timeout: 10000,
  },
  testTimeout: 60000,
});
