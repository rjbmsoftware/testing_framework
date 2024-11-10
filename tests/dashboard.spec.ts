import { test as base, expect } from "../libraries/extended-test";
import { DashboardPage } from "../pages/dashboard-page";

const test = base.extend<{ dashboardPage: DashboardPage }>({
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await use(dashboardPage);
  },
});

test('dashboard title test', async ({ dashboardPage }) => {
  await expect(dashboardPage.page).toHaveTitle(/Dashboard :: Mega IT Corporate 9000!/);
});

/**
 * Uses playwright which underneath uses pixel match for pixel perfect comparison, this can changed
 * by setting the allowable different pixel count
 *
 * to update screenshots
 * npx playwright test --update-snapshots
 */
test('dashboard playwright screen shot', async ({ dashboardPage }) => {
  await expect(dashboardPage.page).toHaveScreenshot();
});

/**
 * Generate reference and actual screenshots for comparison by backstop js
 */
test('visually compare menu', async ({ dashboardPage }) => {
  // TODO 
});