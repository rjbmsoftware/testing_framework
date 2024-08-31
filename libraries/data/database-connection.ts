import mysql, { Pool, PoolConnection } from 'mysql2/promise';

class MySQLConnections {
  static #instance: MySQLConnections;
  readonly pool: Pool;

  private constructor() {
    this.pool = mysql.createPool({
      connectionLimit : 10,
      user: 'snipeit_user',
      database: 'snipeit',
      password: 'snipeit_password'
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
