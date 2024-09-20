import { test as base, expect } from "@playwright/test";
import { CreateCompanyPage } from "../../pages/settings/create-company-page";
import { v4 as uuid } from "uuid";
import { MySQLConnections } from "../../libraries/data/database-connection";
import { CompaniesRepository } from "../../libraries/data/companies-repository";
import { CompaniesPage } from "../../pages/settings/companies-page";

const test = base.extend<{ createCompanyPage: CreateCompanyPage,
                           companiesPage: CompaniesPage,
                           companiesRepository: CompaniesRepository }>({
    createCompanyPage: async ({ page }, use) => {
        const createCompanyPage = new CreateCompanyPage(page);
        await createCompanyPage.goto();
        await use(createCompanyPage);
    },

    companiesRepository: async ({ }, use) => {
        let instance = MySQLConnections.getInstance();
        const companiesRepository = new CompaniesRepository(instance);
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
