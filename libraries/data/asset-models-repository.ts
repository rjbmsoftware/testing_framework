import { DataRepository } from "./data-repository";
import { MySQLConnections } from "./database-connection";
import { AssetModel } from "./interfaces/asset-models-interface";


export class AssetModelsRepository extends DataRepository {

    private readonly findAssetByNameSQL = "SELECT image FROM models WHERE name = ? LIMIT 1;";

    constructor(database_connection_provider: MySQLConnections) {
        super(database_connection_provider)
    }

    async findByName(name: string): Promise<AssetModel | null> {
        return await this.withConnection(async (conn) => {
            const [assetModels] = await conn.query<AssetModel[]>(this.findAssetByNameSQL, name);
            const assetModel = assetModels[0];
            return assetModel;
        });
    }
}