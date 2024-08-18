import type { Locator, Page } from '@playwright/test';
import { EnvironmentVariables } from '../libraries/environment-variables';

export class AssetsPage {
    public readonly url: string;
    public readonly pageHeading: Locator

    constructor(public readonly page: Page) {
        this.url = EnvironmentVariables.instance.baseUrl + '/hardware';
        this.pageHeading = page.getByRole('heading', { name: 'All Assets' })
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
        await this.pageHeading.waitFor({ "state": "visible"});
    }

}
