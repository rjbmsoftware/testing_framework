import { PoolConnection } from "mysql2/promise";
import { MySQLConnections } from "./database-connection";


export class AssetModelsRepository {
    private readonly database_connection_provider: MySQLConnections;
    private database_connection: PoolConnection;

    private readonly findAssetByNameSQL = "";

    // TODO: refactor to parent
    constructor(database_connection_provider: MySQLConnections) {
        this.database_connection_provider = database_connection_provider;
    }

    // TODO: find better way to use connections in functions
    async getConnection(): Promise<PoolConnection> {
        this.database_connection = await this.database_connection_provider.getConnection();
        return this.database_connection;
    }

    // TODO: 
    releaseConnection(): void {
        this.database_connection.release();
    }

    async findByName(name: string): Promise<void> {
        const conn = await this.getConnection();

        this.releaseConnection();
    }
}