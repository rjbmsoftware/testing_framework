import { expect, Locator, Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";


export class CompaniesPage {
    readonly page: Page;
    readonly url: string;
    readonly successBannerLocator: Locator;
    readonly loadingSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/companies';
        this.successBannerLocator = this.page.locator('.alert-success');
        this.loadingSpinner = this.page.locator('loading-text');
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
        await this.waitForPageLoadingSpinner();
    }

    async waitForPageLoadingSpinner(): Promise<void> {
        await expect(this.loadingSpinner).toHaveCount(0);
    }

    async isCompaniesPage(): Promise<boolean> {
        expect(this.page.url()).toBe(this.url);
        await this.waitForPageLoadingSpinner();
        return true;
    }

    async successBanner(): Promise<Locator> {
        return this.successBannerLocator;
    }

    async deleteCompanyByName(companyName: string): Promise<void> {
        await this.page.locator('tr').filter({ hasText: companyName })
            .getByRole('link', { name: 'Delete' }).click({ force: true });

        await this.page.getByRole('button', { name: 'Yes' }).click({ force: true });
    }
}
