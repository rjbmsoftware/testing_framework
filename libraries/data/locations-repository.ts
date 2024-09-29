import { EnvironmentVariables } from "../environment-variables";

export class LocationsRepository {
    readonly url: string;

    constructor() {
        this.url = EnvironmentVariables.instance.baseUrl + '/api/v1/locations';
    }

    async isLocationAvailable(name: string): Promise<boolean> {
        // TODO: call the locations API, with a configured API key
        return true;
    }
}
