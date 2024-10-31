import { EnvironmentVariables } from "../environment-variables";
import axios from "axios";
import fs from "node:fs/promises";
import path from "node:path";

export class ModelsImageRepository {
    readonly url: string;

    constructor() {
        this.url = EnvironmentVariables.instance.baseUrl + '/uploads/models'
    }

    /**
     * Downloads the file from uploads models storing the file in a temporary
     * directory
     * @param imagePath suffix to download URL 
     * @returns path to file
     */
    async getImage(imagePath: string): Promise<string> {
        const imageUrl = `${this.url}/${imagePath}`;
        const imageFilePath = path.resolve(path.join('temporary-files', imagePath));

        const fileResponse = await axios.get(imageUrl, {responseType: 'stream'});
        await fs.writeFile(imageFilePath, fileResponse.data);

        return imageFilePath;
    }
}
