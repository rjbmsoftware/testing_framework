import { type FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
    console.log('Start global teardown');
    console.log('End global teardown');
}

export default globalTeardown;