import { devConfig } from './dev.config';
import { qaConfig } from './qa.config';
import { prodConfig } from './prod.config';

// Get environment from process.env or default to 'dev'
const environment = process.env.TEST_ENV || 'dev';

// Map of available environments to their configurations
const configs = {
    dev: devConfig,
    qa: qaConfig,
    prod: prodConfig
} as const;

// Type for valid environment names
type Environment = keyof typeof configs;

// Validate environment
if (!(environment in configs)) {
    throw new Error(
        `Invalid environment: ${environment}. Must be one of: ${Object.keys(configs).join(', ')}`
    );
}

// Export the configuration for the selected environment
export const config = configs[environment as Environment]; 