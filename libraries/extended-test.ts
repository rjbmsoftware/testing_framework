import { test as base } from "@playwright/test";
import { MySQLConnections } from "./data/database-connection";


export const test = base.extend<{
    mySQLConnections: MySQLConnections
}>({
    mySQLConnections: async ({ }, use) => {
        const mySQLConnections = MySQLConnections.getInstance();
        await use(mySQLConnections);
    }
});

export { expect } from "@playwright/test";
