import { Locator, Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";

export class CreateLocationsPage {
    readonly page: Page;
    readonly url: string;
    readonly loadingSpinner: Locator;
    readonly locationNameTextInput: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/locations/create';
        this.loadingSpinner = this.page.locator('loading-text');

        this.locationNameTextInput = this.page.getByLabel('name');
        this.createButton = this.page.getByRole('button', { name: 'Save' }).first();
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async createLocation(name: string): Promise<void> {
        await this.locationNameTextInput.fill(name);
        await this.createButton.click();
    }
}