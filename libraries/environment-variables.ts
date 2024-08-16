import * as dotenv from 'dotenv';

export class EnvironmentVariables {
    static #instance: EnvironmentVariables;

    public readonly baseUrl: string;
    public readonly username: string;
    public readonly password: string;

    private constructor() {
        dotenv.config()
        this.baseUrl = process.env.BASE_URL ?? '';
        this.username = process.env.SITE_USERNAME ?? '';
        this.password = process.env.SITE_PASSWORD ?? '';
    }

    public static get instance(): EnvironmentVariables{
        if (!EnvironmentVariables.#instance) {
            EnvironmentVariables.#instance = new EnvironmentVariables()
        }

        return EnvironmentVariables.#instance;
    }
}
