import { expect, Locator, Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";


export class CompaniesPage {
    readonly page: Page;
    readonly url: string;
    readonly successBannerLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/companies';
        this.successBannerLocator = this.page.locator('.alert-success');
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async isCompaniesPage(): Promise<boolean> {
        // TODO: add wait for the loading spinner
        expect(this.page.url()).toBe(this.url);
        return true;
    }

    async successBanner(): Promise<Locator> {
        return this.successBannerLocator;
    }
}
