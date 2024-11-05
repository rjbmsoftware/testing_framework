import { PoolConnection } from "mysql2/promise";
import { MySQLConnections } from "./database-connection";
import { AssetModel } from "./interfaces/asset-models-interface";


export class AssetModelsRepository {
    private readonly database_connection_provider: MySQLConnections;
    private database_connection: PoolConnection;

    private readonly findAssetByNameSQL = "SELECT image FROM models WHERE name = ? LIMIT 1;";

    private async withConnection<T>(fn: (conn: PoolConnection) => Promise<T>) {
        const conn = await this.getConnection();
        try {
            return await fn(conn);
        } finally {
            this.releaseConnection();
        }
    }

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

    async findByName(name: string): Promise<AssetModel | null> {
        return await this.withConnection(async (conn) => {
            const [assetModels] = await conn.query<AssetModel[]>(this.findAssetByNameSQL, name);
            const assetModel = assetModels[0];
            return assetModel;
        });
    }

}