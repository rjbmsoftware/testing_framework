import type { Page } from '@playwright/test';
import { EnvironmentVariables } from '../libraries/environment-variables';

export class DashboardPage {
    public readonly url: string;

    constructor(public readonly page: Page) {
        this.url = EnvironmentVariables.instance.baseUrl;
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }
}
