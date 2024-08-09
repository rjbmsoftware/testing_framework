import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto('http://localhost:27015')
    await page.locator('#username').fill('admin')
    await page.locator('#password').fill('Password1234!')
    await page.locator('button:text("Login")').click();

    await page.waitForURL('http://127.0.0.1:27015/');
    await expect(page.getByText('Mega IT Corporate 9000!')).toBeVisible();
    await page.context().storageState({ path: authFile });
});