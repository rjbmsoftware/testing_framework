import {test as base} from "@playwright/test";
import { CreateCompanyPage } from "../../pages/settings/create-company-page";
import { v4 as uuid } from "uuid";

const test = base.extend<{ createCompanyPage: CreateCompanyPage }>({
    createCompanyPage: async ({page}, use) => {
        const createCompanyPage = new CreateCompanyPage(page);
        await createCompanyPage.goto();
        await use(createCompanyPage);
    },
});

test('company created', async ({ createCompanyPage }) => {
    const phoneNumber = '0123456789';
    const faxNumber = phoneNumber;
    const email = 'test@test.com';
    const companyName = uuid();
    await createCompanyPage.createCompany(companyName, phoneNumber, faxNumber, email);

    // verify against database that company is created
    // verify user navigated to company page with banner display
});