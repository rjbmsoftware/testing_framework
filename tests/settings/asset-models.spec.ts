import { v4 as uuid } from "uuid";
import { getComputerImageFixturePath } from "../../libraries/constants";
import { AssetModelsRepository } from "../../libraries/data/asset-models-repository";
import { CategoriesRepository } from "../../libraries/data/categories-repository";
import { ModelsImageRepository } from "../../libraries/data/models-image-repository";
import { test as base, expect } from "../../libraries/extended-test";
import { assertExists } from "../../libraries/helpers";
import { compareImages } from "../../libraries/image-comparison";
import { CreateAssetModelPage } from "../../pages/settings/asset-models-create-page";


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

    assetModelsRepository: async ({ mySQLConnections }, use) => {
        const assetModelsRepository = new AssetModelsRepository(mySQLConnections);
        await use(assetModelsRepository);
    },

    modelsImageRepository: async ({ }, use) => {
        const modelsImageRepository = new ModelsImageRepository();
        await use(modelsImageRepository);
    }
});

test("create asset model, verifying the asset model, associated image", async ({
    createAssetModelPage,
    categoriesRepository,
    assetModelsRepository,
    modelsImageRepository
}) => {
    const categoryName = await categoriesRepository.createCategory();
    const assetModelName = uuid();

    // fill create asset model and check user navigates to asset model list page
    const assetModelPage = await createAssetModelPage.createAssetModel(
        assetModelName, categoryName, getComputerImageFixturePath()
    );

    expect(assetModelPage.isAssetModelsPage()).toBeTruthy();
    const assetModel = await assetModelsRepository.findByName(assetModelName);

    // compare asset image with actual
    assertExists(assetModel?.image);
    const imageFilePath = await modelsImageRepository.getImage(assetModel.image);
    const numDiffPixels = await compareImages(imageFilePath, getComputerImageFixturePath());
    expect(numDiffPixels).toBe(0);
});
