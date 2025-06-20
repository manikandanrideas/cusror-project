import { baseConfig } from './base.config';

export const qaConfig = {
    ...baseConfig,
    baseUrl: 'https://qa.saucedemo.com/v1',
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