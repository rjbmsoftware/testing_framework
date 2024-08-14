import type { Page, Locator } from '@playwright/test';
import * as dotenv from 'dotenv';

export class DashboardPage {
    public readonly url: string;

    constructor(public readonly page: Page) {
        dotenv.config();
        this.url = process.env.BASE_URL ?? '';
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }
}