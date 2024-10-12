import axios from "axios";
import { v4 as uuid } from "uuid";
import { EnvironmentVariables } from "../environment-variables";

export class CategoriesRepository {
    readonly url: string;
    readonly authHeader: object;

    constructor() {
        this.url = EnvironmentVariables.instance.baseUrl + '/api/v1/categories';
        this.authHeader = { "Authorization": "Bearer " + EnvironmentVariables.instance.apiKey };
    }

    /**
     * Generates a UUID category name with a category type of asset
     * @returns name of the new category
     */
    async createCategory(): Promise<string> {
        const categoryName = uuid();
        const requestBody = {
            "name": categoryName,
            "category_type": "asset"
        }
        await axios.post(this.url, requestBody, { "headers": this.authHeader });
        return categoryName;
    }
}
