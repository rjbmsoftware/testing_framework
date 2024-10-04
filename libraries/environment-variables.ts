import * as dotenv from 'dotenv';

export class EnvironmentVariables {
    static #instance: EnvironmentVariables;

    public readonly baseUrl: string;
    public readonly username: string;
    public readonly password: string;
    public readonly dbName: string;
    public readonly dbUsername: string;
    public readonly dbPassword: string;
    public readonly dbMaxConnectionsPerPool: number;
    public readonly apiKey: string;

    private constructor() {
        dotenv.config()
        this.baseUrl = process.env.BASE_URL ?? '';
        this.username = process.env.SITE_USERNAME ?? '';
        this.password = process.env.SITE_PASSWORD ?? '';

        this.dbName = process.env.DB_NAME ?? '';
        this.dbUsername = process.env.DB_USERNAME ?? '';
        this.dbPassword = process.env.DB_PASSWORD ?? '';
        this.dbMaxConnectionsPerPool = parseInt(process.env.DB_MAX_CONNECTIONS_PER_POOL ?? "5");
        this.apiKey = process.env.API_KEY ?? '';
    }

    public static get instance(): EnvironmentVariables{
        if (!EnvironmentVariables.#instance) {
            EnvironmentVariables.#instance = new EnvironmentVariables()
        }

        return EnvironmentVariables.#instance;
    }
}
