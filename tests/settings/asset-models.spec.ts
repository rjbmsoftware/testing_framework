import { test as base, expect } from "@playwright/test";
import { v4 as uuid } from "uuid";
import { getComputerImageFixturePath } from "../../libraries/constants";
import { CategoriesRepository } from "../../libraries/data/categories-repository";
import { CreateAssetModelPage } from "../../pages/settings/asset-models-create-page";

const test = base.extend<{
    createAssetModelPage: CreateAssetModelPage,
    categoriesRepository: CategoriesRepository
}>({
    createAssetModelPage: async ({ page }, use) => {
        const createAssetModelPage = new CreateAssetModelPage(page);
        await createAssetModelPage.goto();
        await use(createAssetModelPage);
    },

    categoriesRepository: async ({ }, use) => {
        const categoriesRepository = new CategoriesRepository();
        await use(categoriesRepository);
    }
});

test("create asset model", async ({ createAssetModelPage, categoriesRepository }) => {
    const categoryName = await categoriesRepository.createCategory();
    const assetModelName = uuid();
    const assetModelPage = await createAssetModelPage.createAssetModel(
        assetModelName, categoryName, getComputerImageFixturePath()
    );


    expect(assetModelPage.isAssetModelsPage()).toBeTruthy();
    // assert asset model is matches uploaded image
        // get the asset model
        // from the asset model find the image
        // download the image and compare
});