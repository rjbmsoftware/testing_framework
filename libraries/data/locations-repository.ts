import { EnvironmentVariables } from "../environment-variables";
import axios from "axios";

export class LocationsRepository {
    readonly url: string;
    readonly authHeader: object;

    constructor() {
        this.url = EnvironmentVariables.instance.baseUrl + '/api/v1/locations';
        this.authHeader = { "Authorization": "Bearer " + EnvironmentVariables.instance.apiKey };
    }

    /**
     * Determines if the location is available by searching for a unique location name and
     * comparing the first result name with the given argument
     * @param name of the location which must be unique
     * @returns if the location is available
     */
    async isLocationAvailable(name: string): Promise<boolean> {
        const { data } = await axios.get(this.url, { "headers": this.authHeader });
        const locationAvailable = data["rows"][0]["name"] === name

        return locationAvailable;
    }
}
