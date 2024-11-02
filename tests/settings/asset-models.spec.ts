import { test as base, expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { getComputerImageFixturePath } from "../../libraries/constants";
import { CategoriesRepository } from "../../libraries/data/categories-repository";
import { CreateAssetModelPage } from "../../pages/settings/asset-models-create-page";
import { AssetModelsRepository } from "../../libraries/data/asset-models-repository";
import { MySQLConnections } from "../../libraries/data/database-connection";
import { ModelsImageRepository } from "../../libraries/data/models-image-repository";
import { Jimp } from "jimp";


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
    const assetModel = await assetModelsRepository.findByName(assetModelName);


    // TODO: find where to put this, typescript type shenanigans
    function assertExists<T>(value: T | null | undefined): asserts value is T {
        if (value == null) throw new Error("Value does not exist");
    }

    assertExists(assetModel?.image);
    const imageFilePath = await modelsImageRepository.getImage(assetModel?.image);

    const img1 = await Jimp.read(imageFilePath);
    const img2 = await Jimp.read(getComputerImageFixturePath());

    if (img1.bitmap.width !== img2.bitmap.width || img1.bitmap.height !== img2.bitmap.height) {
        throw new Error('Images must have the same dimensions for comparison');
    }

    // TODO: remove dynamic import
    const Pixelmatch = (await import('pixelmatch')).default;

    const numDiffPixels = Pixelmatch(
        img1.bitmap.data,
        img2.bitmap.data,
        null, // no diff output image needed
        img1.bitmap.width,
        img1.bitmap.height,
        { threshold: 0.1 }
    );

    expect(numDiffPixels).toBe(0);
});
