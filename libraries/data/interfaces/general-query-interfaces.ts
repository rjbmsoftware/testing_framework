import { RowDataPacket } from "mysql2";

export interface SingleNumberResult extends RowDataPacket {
    value: number
}
