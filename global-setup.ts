import { type FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function globalSetup(config: FullConfig) {
    console.log('Start global setup');
    execSync('podman-compose down');
    execSync('./setup_teardown_scripts/setup.sh')
    execSync('podman-compose up -d');
    console.log('End global setup');
}

export default globalSetup;
