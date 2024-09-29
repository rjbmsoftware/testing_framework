import { test as base, expect } from "@playwright/test";
import { CreateLocationsPage } from "../../pages/settings/locations-create-page";
import { v4 as uuid } from "uuid";
import { LocationsPage } from "../../pages/settings/locations-page";
import { LocationsRepository } from "../../libraries/data/locations-repository";

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
    expect(locationsRepository.isLocationAvailable(locationName)).toBeTruthy();
});