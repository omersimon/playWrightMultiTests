import { test, expect, ElementHandle, Page } from "@playwright/test";

test.describe('chromium only', () => {
    test('go to google and search for car', async ({ page }: { page: Page }) => {
        await page.goto('https://google.co.il');
        await page.locator('input[name="q"]').fill('car in israel');
        await page.locator('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]').click();
        await page.waitForNavigation();

        const results = await page.$$eval('div.g', async (elements, page) => {
            const resultObjects = [];

            for (const element of elements) {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');

                // Get the load time for each website
                const navigationStart = window.performance.timing.navigationStart;
                const loadEventEnd = await page.evaluate(() => window.performance.timing.loadEventEnd);
                const loadTime = loadEventEnd ? loadEventEnd - navigationStart : null;

                resultObjects.push({
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                    loadTime,
                });
            }

            // Calculate the average load time for all websites
            const totalLoadTime = resultObjects.reduce((acc, curr) => acc + curr.loadTime, 0);
            const averageLoadTime = totalLoadTime / resultObjects.length;

            // Add the average load time to the results object
            const result = {
                query: 'car in israel',
                results: resultObjects,
                averageLoadTime,
            };

            return result;
        }, page);

        // Print the results to the console
        console.log(JSON.stringify(results));

        // Add your own assertion here, if necessary
    });
});
