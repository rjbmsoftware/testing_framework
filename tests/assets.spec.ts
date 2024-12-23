import { test as base, expect } from '../libraries/extended-test';
import { AssetsPage } from '../pages/assets-hardware-page';

const test = base.extend<{ assetsPage: AssetsPage }>({
  assetsPage: async ({ page }, use) => {
    const assetsPage = new AssetsPage(page);
    await assetsPage.goto();
    await use(assetsPage);
  },
});

test('page heading is all assets', async ({ assetsPage }) => {
  await expect(assetsPage.pageHeading).toHaveText("All Assets")
});