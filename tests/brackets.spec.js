import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

test('brackets qualifier baseline', async ({ page }) => {
  // Intercept the CSV request.
  await page.route(
    '**/1IfaRkxsSQSrc9FloVuEY5paGmeEuTOGvru5TJeR6Hvg/*format=csv*',
    async (route) => {
      const body = readFileSync(
        'tests/fixtures/brackets-qualifier-upper-1-empty-score.csv',
        'utf8',
      );
      await route.fulfill({
        status: 200,
        contentType: 'text/csv',
        body,
      });
    },
  );

  await page.goto('/brackets.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // wait for any potential animations or rendering to complete

  await expect(page).toHaveScreenshot('brackets-qualifier-baseline.png', {
    fullPage: true,
  });
});

test('brackets qualifier complete', async ({ page }) => {
  // Intercept the CSV request.
  await page.route(
    '**/1IfaRkxsSQSrc9FloVuEY5paGmeEuTOGvru5TJeR6Hvg/*format=csv*',
    async (route) => {
      const body = readFileSync('tests/fixtures/brackets-qualifier-complete.csv', 'utf8');
      await route.fulfill({
        status: 200,
        contentType: 'text/csv',
        body,
      });
    },
  );

  await page.goto('/brackets.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // wait for any potential animations or rendering to complete

  await expect(page).toHaveScreenshot('brackets-qualifier-complete.png', {
    fullPage: true,
  });
});
