import mysql, { ConnectionOptions, Pool, PoolConnection } from 'mysql2/promise';

const access: ConnectionOptions = {
  user: 'snipeit_user',
  database: 'snipeit',
  password: 'snipeit_password'
};

const conn = mysql.createConnection(access);

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

  public static async getConnection(): Promise<PoolConnection> {
    if (!MySQLConnections.#instance) {
      MySQLConnections.#instance = new MySQLConnections();
    }

    return await this.#instance.pool.getConnection();
  }
}

export { conn, MySQLConnections };
