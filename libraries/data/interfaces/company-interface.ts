import { RowDataPacket } from "mysql2";

export interface Company extends RowDataPacket {
    id: number,
    name: string | null,
    fax: string | null,
    email: string | null,
    phone: string | null,
    created_at: string,
    updated_at: string,
    image: string | null
}
