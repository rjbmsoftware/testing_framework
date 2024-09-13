import { type FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

async function globalTeardown(config: FullConfig) {
    console.log('Start global teardown');
    execSync('podman-compose down');
    execSync('./setup_teardown_scripts/tear_down.sh')
    console.log('End global teardown');
}

export default globalTeardown;