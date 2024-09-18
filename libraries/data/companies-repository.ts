import { PoolConnection } from "mysql2/promise";
import { MySQLConnections } from "./database-connection";
import { Company } from "./interfaces/company-interface";
import { SingleNumberResult } from "./interfaces/general-query-interfaces";

export class CompaniesRepository {
    private readonly database_connection_provider: MySQLConnections;
    private database_connection: PoolConnection;

    private readonly findCompanyByNameSQL = "SELECT * FROM companies WHERE name = ?;";

    private readonly createCompanySQL = `
        INSERT INTO companies
            (name, fax, email, phone, created_at, updated_at)
        VALUES
            (?, ?, ?, ?, NOW(), NOW());

        SELECT LAST_INSERT_ID();
    `;

    constructor(database_connection_provider: MySQLConnections) {
        this.database_connection_provider = database_connection_provider;
    }

    async getConnection(): Promise<PoolConnection> {
        this.database_connection = await this.database_connection_provider.getConnection();
        return this.database_connection;
    }

    async findCompanyByName(companyName: string): Promise<Company | undefined> {
        let conn = await this.getConnection();

        let [companies] = await conn.query<Company[]>(this.findCompanyByNameSQL, companyName);
        let company: Company = companies[0];

        this.releaseConnection();

        return company;
    }

    async createCompany(name: string, phone: string, fax: string, email: string): Promise<number> {
        let conn = await this.getConnection();

        const args = [name, fax, phone, email];

        let rows = await conn.execute<SingleNumberResult[]>(this.createCompanySQL, args);

        this.releaseConnection();

        return rows[0][0].value;
    }

    releaseConnection(): void {
        this.database_connection.release();
    }
}