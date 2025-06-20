import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    async navigate(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for the page to be loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get the current page title
     * @returns The page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Click on an element
     * @param selector The selector of the element to click
     */
    async click(selector: string) {
        await this.page.click(selector);
    }

    /**
     * Fill a form field
     * @param selector The selector of the input field
     * @param value The value to fill in
     */
    async fill(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

    /**
     * Get text content of an element
     * @param selector The selector of the element
     * @returns The text content
     */
    async getText(selector: string): Promise<string> {
        return await this.page.textContent(selector) || '';
    }

    /**
     * Check if an element is visible
     * @param selector The selector of the element
     * @returns True if the element is visible
     */
    async isVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }
} 