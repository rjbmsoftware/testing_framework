import { test as base, expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { getComputerImageFixturePath } from "../../libraries/constants";
import { CategoriesRepository } from "../../libraries/data/categories-repository";
import { CreateAssetModelPage } from "../../pages/settings/asset-models-create-page";
import { AssetModelsRepository } from "../../libraries/data/asset-models-repository";
import { MySQLConnections } from "../../libraries/data/database-connection";
import { ModelsImageRepository } from "../../libraries/data/models-image-repository";
import fs from "node:fs/promises"
// import fs from "node:fs"

const test = base.extend<{
    createAssetModelPage: CreateAssetModelPage,
    categoriesRepository: CategoriesRepository,
    assetModelsRepository: AssetModelsRepository,
    modelsImageRepository: ModelsImageRepository
}>({
    createAssetModelPage: async ({ page }, use) => {
        const createAssetModelPage = new CreateAssetModelPage(page);
        await createAssetModelPage.goto();
        await use(createAssetModelPage);
    },

    categoriesRepository: async ({ }, use) => {
        const categoriesRepository = new CategoriesRepository();
        await use(categoriesRepository);
    },


    assetModelsRepository: async ({ }, use) => {
        // TODO: refactor into base test
        const instance = MySQLConnections.getInstance();
        const assetModelsRepository = new AssetModelsRepository(instance);
        await use(assetModelsRepository);
    },

    modelsImageRepository: async ({ }, use) => {
        const modelsImageRepository = new ModelsImageRepository();
        await use(modelsImageRepository);
    }
});

test("create asset model", async ({
    createAssetModelPage,
    categoriesRepository,
    assetModelsRepository,
    modelsImageRepository
}) => {

    const categoryName = await categoriesRepository.createCategory();
    const assetModelName = uuid();
    const assetModelPage = await createAssetModelPage.createAssetModel(
        assetModelName, categoryName, getComputerImageFixturePath()
    );

    expect(assetModelPage.isAssetModelsPage()).toBeTruthy();

    // assert asset model is matches uploaded image, starting to look like two tests
    // --get the asset model
    // --from the asset model find the image
    // download the image and compare
    const assetModel = await assetModelsRepository.findByName(assetModelName);
    expect(assetModel).toBeTruthy();

    if (assetModel && assetModel.image) {
        const imageFilePath = await modelsImageRepository.getImage(assetModel.image);

        try {
            await new Promise(resolve => setTimeout(resolve, 250));
            const dataFromSUT = await fs.readFile(imageFilePath);
            const dataFromFixture = await fs.readFile(getComputerImageFixturePath());
            // expect(dataFromSUT).toEqual(dataFromFixture);
            // expect(true).toEqual(false);
        } catch (err) {
            console.log(err);
        }
    }

});