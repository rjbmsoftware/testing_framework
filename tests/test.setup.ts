import { test as setup, expect } from '@playwright/test';
import { EnvironmentVariables } from '../libraries/environment-variables'

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const env = EnvironmentVariables.instance
    await page.goto(env.baseUrl);
    await page.locator('#username').fill(env.username);
    await page.locator('#password').fill(env.password);
    await page.getByLabel('Remember Me').click();
    await page.locator('button:text("Login")').click();

    await expect(page.getByText('Mega IT Corporate 9000!')).toBeVisible();
    await page.context().storageState({ path: authFile });
});