import { Page } from '@playwright/test';

export class GoogleSearchPage {
    private page: Page;
    private searchInput = 'input[name=q]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto('https://www.google.com/',{ waitUntil: 'domcontentloaded' });
    }

    async search(keyword: string) {
        await this.page.fill(this.searchInput, keyword);
        await this.page.press(this.searchInput, 'Enter');
        await this.page.waitForNavigation();
    }
}
