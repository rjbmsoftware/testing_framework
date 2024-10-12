import { test as base, expect } from "@playwright/test";
import { CreateAssetModelPage } from "../../pages/settings/asset-models-create-page";
import { CategoriesRepository } from "../../libraries/data/categories-repository";

const test = base.extend<{
    createAssetModelPage: CreateAssetModelPage,
    categoriesRepository: CategoriesRepository
}>({
    createAssetModelPage: async ({ page }, use) => {
        const createAssetModelPage = new CreateAssetModelPage(page);
        await createAssetModelPage.goto();
        await use(createAssetModelPage);
    },

    categoriesRepository: async ({}, use) => {
        const categoriesRepository = new CategoriesRepository();
        await use(categoriesRepository);
    }
});

test("create asset model", async ({ createAssetModelPage, categoriesRepository }) => {
    const categoryName = await categoriesRepository.createCategory();
    await createAssetModelPage.createAssetModel('some test', categoryName, 'path');
    // create the asset model uploading an image
    // check asset model image is displayed on models page
});