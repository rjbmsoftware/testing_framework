import {test as base, expect} from "@playwright/test";
import { CreateCompanyPage } from "../../pages/settings/create-company-page";
import { v4 as uuid } from "uuid";
import { conn } from "../../libraries/data/database-connection";
import { RowDataPacket } from "mysql2";

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
    const companyName: string = uuid();
    await createCompanyPage.createCompany(companyName, phoneNumber, faxNumber, email);

    let [rows]: [RowDataPacket[], any] = await conn.promise().query("SELECT * FROM companies WHERE name = ?;", [companyName]);

    expect(rows.length).toBe(1);

    await conn.promise().end();


    // --verify against database that company is created
    // --connect to snipeit database
    // id name fax email phone created_at updated_at image
    // verify user navigated to company page with banner display
});