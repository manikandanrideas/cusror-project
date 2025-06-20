import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Helpers } from '../utils/helpers';
import { config } from '../config/config';

test.describe('Sauce Demo Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('successful login with valid credentials', async ({ page }) => {
        await loginPage.login(
            config.credentials.validUser.username,
            config.credentials.validUser.password
        );
        
        // Verify successful login
        expect(await loginPage.isLoggedIn()).toBeTruthy();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('failed login with invalid credentials', async ({ page }) => {
        await loginPage.login(
            config.credentials.invalidUser.username,
            config.credentials.invalidUser.password
        );
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
        
        // Take screenshot on failure
        await Helpers.takeScreenshot(page, 'login-failure');
    });

    test('login form validation - empty credentials', async ({ page }) => {
        await loginPage.login('', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username is required');
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    });

    test('login form validation - empty username', async ({ page }) => {
        await loginPage.login('', config.credentials.validUser.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username is required');
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    });

    test('login form validation - empty password', async ({ page }) => {
        await loginPage.login(config.credentials.validUser.username, '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Password is required');
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    });
}); 