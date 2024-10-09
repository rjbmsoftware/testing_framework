import { test as base, expect } from "@playwright/test";
import { CreateAssetModelPage } from "../../pages/settings/asset-models-create-page";

const test = base.extend<{ createAssetModelPage: CreateAssetModelPage }>({
    createAssetModelPage: async ({ page }, use) => {
        const createAssetModelPage = new CreateAssetModelPage(page);
        await createAssetModelPage.goto();
        await use(createAssetModelPage);
    }
});

test("create asset model", async({ createAssetModelPage }) => {
    // asset models need a category
    // create the asset model uploading an image
    // check asset model image is displayed on models page
});