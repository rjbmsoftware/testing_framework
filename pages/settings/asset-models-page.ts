import { Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";


export class AssetModelsPage {

    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/models'
    }

    isAssetModelsPage(): boolean {
        return this.page.url() === this.url
    }
}