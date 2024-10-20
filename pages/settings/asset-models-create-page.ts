import { Locator, Page } from "@playwright/test";
import { EnvironmentVariables } from "../../libraries/environment-variables";
import { AssetModelsPage } from "./asset-models-page";


export class CreateAssetModelPage {
    readonly url: string;
    readonly page: Page;

    readonly assetModelName: Locator;
    readonly categoryNameDropDown: Locator;
    readonly saveButton: Locator;
    readonly fileUploadButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = EnvironmentVariables.instance.baseUrl + '/models/create';

        this.assetModelName = page.getByLabel('name');
        this.categoryNameDropDown = page.getByLabel('Select a Category');
        this.saveButton = page.getByRole('button', { name: 'Save' }).first();
        this.fileUploadButton = page.getByText('Select File...');
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    /**
     * Accepted filetypes are jpg, webp, png, gif, svg, and avif.
     * Max upload size allowed is 2M.
     * @param name 
     * @param categoryName 
     * @param image_path absolute path to image file
     */
    async createAssetModel(name: string, categoryName: string, image_path: string): Promise<AssetModelsPage> {
        await this.assetModelName.fill(name);
        await this.categoryNameDropDown.click();
        await this.page.getByText(categoryName).click();
        await this.fileUploadButton.setInputFiles(image_path)

        await this.saveButton.click();

        return new AssetModelsPage(this.page);
    }
}