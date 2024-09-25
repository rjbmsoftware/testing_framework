import { Locator, Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";

export class LocationsPage {
    readonly page: Page;
    readonly url: string;
    readonly loadingSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/locations';
        this.loadingSpinner = this.page.locator('loading-text');
    }
}