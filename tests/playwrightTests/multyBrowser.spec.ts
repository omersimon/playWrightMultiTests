import { test, expect } from '@playwright/test';

test.describe('', () => {


    test('', async ({ browser }) => {
        const urls = ['https://www.google.com', 'https://www.wikipedia.org', 'https://www.github.com'];

        // Open pages in parallel
        const pages = await Promise.all(
            urls.map(async (url) => {
                const page = await browser.newPage();
                await page.goto(url);
                return page;
            })
        );

        await Promise.all(
            pages.map(async (page) => {
                expect(await page.title()).toBeTruthy();
                await page.close();
            })
        );
    });
});
