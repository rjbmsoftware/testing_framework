import { v4 as uuid } from "uuid";
import { CompaniesRepository } from "../../libraries/data/companies-repository";
import { test as base, expect } from "../../libraries/extended-test";
import { CompaniesPage } from "../../pages/settings/companies-page";
import { CreateCompanyPage } from "../../pages/settings/create-company-page";

const test = base.extend<{
    createCompanyPage: CreateCompanyPage,
    companiesPage: CompaniesPage,
    companiesRepository: CompaniesRepository
}>({
    createCompanyPage: async ({ page }, use) => {
        const createCompanyPage = new CreateCompanyPage(page);
        await createCompanyPage.goto();
        await use(createCompanyPage);
    },

    companiesRepository: async ({ mySQLConnections }, use) => {
        const companiesRepository = new CompaniesRepository(mySQLConnections);
        await use(companiesRepository);
    },

    companiesPage: async ({ page }, use) => {
        const companiesPage = new CompaniesPage(page);
        await use(companiesPage);
    },
});

test('company created', async ({ createCompanyPage, companiesRepository }) => {
    const phoneNumber = '0123456789';
    const faxNumber = phoneNumber;
    const email = 'test@test.com';
    const companyName: string = uuid();
    const companiesPage: CompaniesPage = await createCompanyPage.createCompany(
        companyName, phoneNumber, faxNumber, email
    );

    const company = await companiesRepository.findCompanyByName(companyName);

    expect(company?.name).toBe(companyName);

    const isCompaniesPage = await companiesPage.isCompaniesPage();
    expect(isCompaniesPage).toBeTruthy();
});

test('company deleted', async ({ companiesPage, companiesRepository }) => {
    const companyName: string = uuid();
    const phoneFaxNumber = '123456'
    const email = 'test@test.com';
    await companiesRepository.createCompany(
        companyName, phoneFaxNumber, phoneFaxNumber, email
    );

    await companiesPage.goto();
    await companiesPage.deleteCompanyByName(companyName);

    const company = await companiesRepository.findCompanyByName(companyName);
    expect(company).toBeUndefined();
});
