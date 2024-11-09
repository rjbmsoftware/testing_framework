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

test('dashboard playwright screen shot', async ({ dashboardPage }) => {
  await expect(dashboardPage.page).toHaveScreenshot();
});