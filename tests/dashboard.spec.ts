import { test, expect } from '@playwright/test';


test('dashboard title test', async ({ page }) => {
  await page.goto('http://127.0.0.1:27015/')
  await expect(page).toHaveTitle(/Dashboard :: Mega IT Corporate 9000!/);
});
