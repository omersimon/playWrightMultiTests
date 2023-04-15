import {test, expect} from "@playwright/test";

test.describe('chromium only', () => {
    test('go to google ans search car  ', async ({page}) => {
            await page.goto('https://google.co.il');
            await page.locator('input[name="q"]').fill('car in israel')
            await page.waitForTimeout(5000);
            await page.locator('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]').click();


        const results = await page.$$eval('div.g', (elements) => {
            return elements.map((element) => {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');
                const loadTime = element.querySelector('span')
                    ?.textContent?.match(/([\d,]+\ssecs?|[\d,]+\smins?)/)?.[0] ?? '';

                return {
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                    loadTime,
                };
            });
        });

        console.log(results);
        })
    test('crete json file   ', async ({page}) => {
        const linkElements = await page.$$('a');
        const links = [];
        for (let linkElement of linkElements) {
            const href = await linkElement.getAttribute('href');
            const title = await page.title();
            const loadTime = await page.evaluate(() => performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart);

            links.push({ href, title, loadTime });
        }
        console.log(JSON.stringify(links));

    })
});
