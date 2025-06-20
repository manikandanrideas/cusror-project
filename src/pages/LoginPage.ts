import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/config';

export class LoginPage extends BasePage {
    // Selectors
    private readonly usernameInput = '#user-name';
    private readonly passwordInput = '#password';
    private readonly loginButton = '#login-button';
    private readonly errorMessage = '[data-test="error"]';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to the login page
     */
    async navigateToLoginPage() {
        await this.navigate(config.baseUrl);
        await this.waitForPageLoad();
    }

    /**
     * Login with username and password
     * @param username Username
     * @param password Password
     */
    async login(username: string, password: string) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
        await this.waitForPageLoad();
    }

    /**
     * Get error message text
     * @returns Error message text
     */
    async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessage);
    }

    /**
     * Check if error message is visible
     * @returns True if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.isVisible(this.errorMessage);
    }

    /**
     * Check if user is logged in by verifying inventory page URL
     * @returns True if user is on inventory page
     */
    async isLoggedIn(): Promise<boolean> {
        return this.page.url().includes('/inventory.html');
    }
} 