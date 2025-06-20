import { baseConfig } from './base.config';

export const prodConfig = {
    ...baseConfig,
    baseUrl: 'https://www.saucedemo.com',
    credentials: {
        validUser: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        invalidUser: {
            username: 'invalid_user',
            password: 'invalid_password'
        }
    }
}; 