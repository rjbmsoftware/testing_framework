import { test as base, expect } from '@playwright/test';
import { AssetsPage } from '../pages/assets-hardware-page';

const test = base.extend<{ assetsPage: AssetsPage }>({
  assetsPage: async ({ page }, use) => {
    const assetsPage = new AssetsPage(page);
    await assetsPage.goto();
    await use(assetsPage);
  },
});

test('page heading is all assets', async ({ assetsPage }) => {
    // expect(assetsPage.getHeading()).toContain("All Assets");
    expect(assetsPage.pageHeading).toHaveText("All Assets")
});