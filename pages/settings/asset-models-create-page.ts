import { Locator, Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";


export class CreateAssetModelPage {
    readonly url: string;
    readonly page: Page;
    readonly assetModelName: Locator;
    readonly categoryNameDropDown: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/models/create';

        this.assetModelName = page.getByLabel('name');
        this.categoryNameDropDown = page.getByLabel('Select a Category');
        this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    /**
     * Accepted filetypes are jpg, webp, png, gif, svg, and avif.
     * Max upload size allowed is 2M.
     * @param name 
     * @param categoryName 
     * @param image_path 
     */
    async createAssetModel(name: string, categoryName: string, image_path: string): Promise<void> {
        await this.assetModelName.fill(name);
        await this.categoryNameDropDown.click();
        await this.page.getByText('test asset model category').click();
        await this.saveButton.click();
    }
}