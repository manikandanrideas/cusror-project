import { Page } from '@playwright/test';
import { config } from '../config/config';

export class Helpers {
    /**
     * Wait for an element to be visible
     * @param page Playwright page object
     * @param selector Element selector
     * @param timeout Timeout in milliseconds
     */
    static async waitForElement(page: Page, selector: string, timeout = config.timeouts.defaultTimeout) {
        await page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Generate a random string
     * @param length Length of the random string
     * @returns Random string
     */
    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Take a screenshot
     * @param page Playwright page object
     * @param name Screenshot name
     */
    static async takeScreenshot(page: Page, name: string) {
        await page.screenshot({ path: `./screenshots/${name}-${Date.now()}.png` });
    }

    /**
     * Wait for network requests to complete
     * @param page Playwright page object
     */
    static async waitForNetworkIdle(page: Page) {
        await page.waitForLoadState('networkidle');
    }

    /**
     * Get current date in a specific format
     * @param format Date format
     * @returns Formatted date string
     */
    static getFormattedDate(format: string = 'YYYY-MM-DD'): string {
        const date = new Date();
        return format
            .replace('YYYY', date.getFullYear().toString())
            .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
            .replace('DD', date.getDate().toString().padStart(2, '0'));
    }
} 