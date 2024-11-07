import { DataRepository } from "./data-repository";
import { MySQLConnections } from "./database-connection";
import { Company } from "./interfaces/company-interface";

export class CompaniesRepository extends DataRepository {

    private readonly findCompanyByNameSQL = "SELECT * FROM companies WHERE name = ?;";

    private readonly createCompanySQL = `
    INSERT INTO companies
        (name, fax, email, phone, created_at, updated_at)
    VALUES
        (?, ?, ?, ?, NOW(), NOW());
`;

    constructor(database_connection_provider: MySQLConnections) {
        super(database_connection_provider)
    }

    async findCompanyByName(companyName: string): Promise<Company | undefined> {
        let company = await this.withConnection(async (conn) => {
            let [companies] = await conn.query<Company[]>(this.findCompanyByNameSQL, companyName);
            return companies[0];
        });

        return company;
    }

    async createCompany(name: string, phone: string, fax: string, email: string): Promise<void> {
        await this.withConnection(async (conn) => {
            const args = [name, fax, phone, email];
            await conn.execute(this.createCompanySQL, args);
        });
    }
}