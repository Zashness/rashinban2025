import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

function getFulfillOptions(body) {
  return {
    status: 200,
    contentType: 'text/csv',
    body,
  };
}

test('brackets finals baseline', async ({ page }) => {
  // Intercept the CSV request.
  await page.route(
    '**/1IfaRkxsSQSrc9FloVuEY5paGmeEuTOGvru5TJeR6Hvg/*format=csv*',
    async (route) => {
      const body = readFileSync('tests/fixtures/brackets-finals-upper-1.csv', 'utf8');
      await route.fulfill(getFulfillOptions(body));
    },
  );

  await page.goto('/brackets-finals.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // wait for any potential animations or rendering to complete

  await expect(page).toHaveScreenshot('brackets-finals-baseline.png', {
    fullPage: true,
  });
});

test('brackets finals complete', async ({ page }) => {
  // Intercept the CSV request.
  await page.route(
    '**/1IfaRkxsSQSrc9FloVuEY5paGmeEuTOGvru5TJeR6Hvg/*format=csv*',
    async (route) => {
      const body = readFileSync('tests/fixtures/brackets-finals-match-14.csv', 'utf8');
      await route.fulfill(getFulfillOptions(body));
    },
  );

  await page.goto('/brackets-finals.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // wait for any potential animations or rendering to complete

  await expect(page).toHaveScreenshot('brackets-finals-complete.png', {
    fullPage: true,
  });
});

test('brackets finals match 15', async ({ page }) => {
  // Intercept the CSV request.
  await page.route(
    '**/1IfaRkxsSQSrc9FloVuEY5paGmeEuTOGvru5TJeR6Hvg/*format=csv*',
    async (route) => {
      const body = readFileSync('tests/fixtures/brackets-finals-match-15.csv', 'utf8');
      await route.fulfill(getFulfillOptions(body));
    },
  );

  await page.goto('/brackets-finals.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // wait for any potential animations or rendering to complete

  await expect(page).toHaveScreenshot('brackets-finals-match-15.png', {
    fullPage: true,
  });
});
