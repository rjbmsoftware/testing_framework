import { expect, type Locator, type Page } from '@playwright/test';
import { EnvironmentVariables } from '../../libraries/environment-variables';
import { CompaniesPage } from './companies-page';

export class CreateCompanyPage {
    public readonly url: string;
    public readonly nameTextInput: Locator;
    public readonly phoneNumberTextInput: Locator;
    public readonly faxNumberTextInput: Locator;
    public readonly emailTextInput: Locator;
    public readonly saveButton: Locator;

    constructor(public readonly page: Page) {
        this.url = EnvironmentVariables.instance.baseUrl + '/companies/create';
        this.nameTextInput = page.getByLabel('name');
        this.phoneNumberTextInput = page.getByLabel('phone');
        this.faxNumberTextInput = page.getByLabel('Fax');
        this.emailTextInput = page.getByLabel('Email');
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    /**
     * Fills create company form then saves navigating the user to the companies page.
     * An empty name will fail the forms validation.
     * @param name 
     * @param phone 
     * @param fax 
     * @param email 
     */
    async createCompany(name: string, phone: string, fax: string, email: string): Promise<CompaniesPage> {
        await this.nameTextInput.fill(name);
        await this.phoneNumberTextInput.fill(phone);
        await this.faxNumberTextInput.fill(fax);
        await this.emailTextInput.fill(email);
        await this.saveButton.click();

        return new CompaniesPage(this.page);
    }
}
