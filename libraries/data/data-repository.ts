import { PoolConnection } from "mysql2/promise";
import { MySQLConnections } from "./database-connection";


export class DataRepository {
    protected readonly database_connection_provider: MySQLConnections;
    protected database_connection: PoolConnection;

    constructor(database_connection_provider: MySQLConnections) {
        this.database_connection_provider = database_connection_provider;
    }

    /**
     * Context manager for a database connection, call with your function this sets up the
     * database connection and releases it after your function has been called, use conn within
     * your function to execute queries.
     * @param fn 
     * @returns the output from the argument function
     */
    protected async withConnection<T>(fn: (conn: PoolConnection) => Promise<T>) {
        const conn = await this.getConnection();
        try {
            return await fn(conn);
        } finally {
            this.releaseConnection();
        }
    }

    private async getConnection(): Promise<PoolConnection> {
        this.database_connection = await this.database_connection_provider.getConnection();
        return this.database_connection;
    }

    private releaseConnection(): void {
        this.database_connection.release();
    }
}