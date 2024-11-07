import { v4 as uuid } from "uuid";
import { LocationsRepository } from "../../libraries/data/locations-repository";
import { test as base, expect } from "../../libraries/extended-test";
import { CreateLocationsPage } from "../../pages/settings/locations-create-page";
import { LocationsPage } from "../../pages/settings/locations-page";

const test = base.extend<{
    createLocationsPage: CreateLocationsPage,
    locationsRepository: LocationsRepository
}>({
    createLocationsPage: async ({ page }, use) => {
        const createLocationsPage = new CreateLocationsPage(page);
        await use(createLocationsPage);
    },

    locationsRepository: async ({ }, use) => {
        const locationsRepository = new LocationsRepository();
        await use(locationsRepository);
    }
});

test('location created', async ({ createLocationsPage, locationsRepository }) => {
    await createLocationsPage.goto();
    const locationName: string = uuid();
    const locationsPage: LocationsPage = await createLocationsPage.createLocation(locationName);

    expect(locationsPage.isLocationsPage()).toBeTruthy();
    const locationExists: boolean = await locationsRepository.isLocationAvailable(locationName);
    expect(locationExists).toBeTruthy();
});