import { test, expect } from "@playwright/test";

test.describe('chromium only', () => {
    test('go to google and search car in israel', async ({ page }) => {
        await page.goto('https://google.com');
        await page.locator('input[name="q"]').fill('car in israel');
       // await page.waitForTimeout(1000);
        await page.waitForSelector('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]');
        await page.locator('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]').click();

        const links = [];

        const linkElements = await page.$$('div.g');
        for (let linkElement of linkElements) {
            const href = await linkElement.$eval('a', a => a.href);
            const title = await linkElement.$eval('h3', h3 => h3.textContent);
            const loadTime = await linkElement.$eval('span', span => {
                const match = span.textContent?.match(/([\d,]+\ssecs?|[\d,]+\smins?)/);
                return match ? match[0] : '';
            });

            links.push({ href, title, loadTime });
        }

        console.log(JSON.stringify(links));

    });

    // test.skip('create JSON object with link info', async ({ page }) => {
    //     const links = [];
    //
    //     const linkElements = await page.$$('div.g');
    //     for (let linkElement of linkElements) {
    //         const href = await linkElement.$eval('a', a => a.href);
    //         const title = await linkElement.$eval('h3', h3 => h3.textContent);
    //         const loadTime = await linkElement.$eval('span', span => {
    //             const match = span.textContent?.match(/([\d,]+\ssecs?|[\d,]+\smins?)/);
    //             return match ? match[0] : '';
    //         });
    //
    //         links.push({ href, title, loadTime });
    //     }
    //
    //     console.log(JSON.stringify(links));
    // });
});
