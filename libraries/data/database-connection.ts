import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import { EnvironmentVariables } from '../environment-variables';

class MySQLConnections {
  static #instance: MySQLConnections;
  readonly pool: Pool;

  private constructor() {
    let env = EnvironmentVariables.instance;

    this.pool = mysql.createPool({
      connectionLimit : env.dbMaxConnectionsPerPool,
      user: env.dbUsername,
      database: env.dbName,
      password: env.dbPassword
    });
  }

  public async getConnection(): Promise<PoolConnection> {
    return await MySQLConnections.getInstance().pool.getConnection();
  }

  public static getInstance(): MySQLConnections {
    if (!MySQLConnections.#instance) {
      MySQLConnections.#instance = new MySQLConnections();
    }

    return MySQLConnections.#instance;
  }
}

export { MySQLConnections };
