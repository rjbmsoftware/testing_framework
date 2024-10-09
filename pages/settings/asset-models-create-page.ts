import { Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";


export class CreateAssetModelPage {
    readonly url: string;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/models/create';
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }
}