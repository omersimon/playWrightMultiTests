import {Browser, chromium, Page} from '@playwright/test';

export class GoogleSearchResultsPage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;
    }


    async getSearchResults(): Promise<any[]> {
        return this.page.$$eval('div.g', (elements: ElementHandle[]) => {
            return elements.map((element) => {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');

                return {
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                    loadtime: '',
                };
            });
        });
    };


    async calculateAverageLoadTime(): Promise<number> {
        const results = await this.getSearchResults();
        let totalLoadTime = 0;
        const browser: Browser = await chromium.launch();
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        for (const result of results) {
            const time = Date.now();
            await Promise.all([
                page.goto(result.link),
                page.waitForNavigation(),
            ]);
            const timeSpent = (Date.now() - time) / 1000;
            result.loadtime = timeSpent.toString();
            totalLoadTime += timeSpent;
        }
        const averageTime = totalLoadTime / results.length;
        await browser.close();
        return averageTime;
    }
}
