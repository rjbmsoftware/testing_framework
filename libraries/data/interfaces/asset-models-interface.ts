import { RowDataPacket } from "mysql2";

export interface AssetModel extends RowDataPacket {
    image: string | null
}