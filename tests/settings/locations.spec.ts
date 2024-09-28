import { test as base, expect} from "@playwright/test";
import { CreateLocationsPage } from "../../pages/settings/locations-create-page";
import { v4 as uuid } from "uuid";
import { LocationsPage } from "../../pages/settings/locations-page";

const test = base.extend<{ createLocationsPage: CreateLocationsPage }>({
    createLocationsPage: async ({ page }, use) => {
        const createLocationsPage = new CreateLocationsPage(page);
        await use(createLocationsPage);
    }
});

test('location created', async ({ createLocationsPage }) => {
    await createLocationsPage.goto();
    const locationName: string = uuid();
    const locationsPage: LocationsPage = await createLocationsPage.createLocation(locationName);

    expect(locationsPage.isLocationsPage()).toBeTruthy();
    // check location is created 
});