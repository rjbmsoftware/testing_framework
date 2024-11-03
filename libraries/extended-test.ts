import { test as base } from "@playwright/test";
import { MySQLConnections } from "./data/database-connection";


// TODO: refactor so that common fixtures are extended from here,
// the same for expect so they all import from the same file
export const test = base.extend<{
    mySQLConnections: MySQLConnections
}>({
    mySQLConnections: async ({ }, use) => {
        const mySQLConnections = MySQLConnections.getInstance();
        await use(mySQLConnections);
    }
});
