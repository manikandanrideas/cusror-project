import { baseConfig } from './base.config';

export const devConfig = {
    ...baseConfig,
    baseUrl: 'https://www.saucedemo.com/v1',
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