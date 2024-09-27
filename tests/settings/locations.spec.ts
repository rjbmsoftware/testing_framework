import { test as base} from "@playwright/test";
import { CreateLocationsPage } from "../../pages/settings/locations-create-page";

const test = base.extend<{ createLocationsPage: CreateLocationsPage }>({
    createLocationsPage: async ({ page }, use) => {
        const createLocationsPage = new CreateLocationsPage(page);
        await use(createLocationsPage);
    }
});

test('location created', async ({ createLocationsPage }) => {
    await createLocationsPage.goto();
    // fill create location page form

    // check directed to locations list page
    // check location is created 
});