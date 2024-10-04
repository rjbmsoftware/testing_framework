import { EnvironmentVariables } from "../environment-variables";
import axios from "axios";

export class LocationsRepository {
    readonly url: string;
    readonly authHeader: object;

    constructor() {
        this.url = EnvironmentVariables.instance.baseUrl + '/api/v1/locations';
        this.authHeader = {"Authorization": "Bearer " + EnvironmentVariables.instance.apiKey};
    }

    async isLocationAvailable(name: string): Promise<boolean> {
        // TODO: call the locations API, with a configured API key
        const { data } = await axios.get(this.url, { "headers": this.authHeader})
        return true;
    }
}
