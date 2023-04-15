"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('chromium only', () => {
    test_1.test.only('go to google ans search car  ', async ({ page }) => {
        await page.goto('https://google.co.il');
        await page.locator('input[name="q"]').fill('car in israel');
        await page.locator('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]').click();
        await page.waitForNavigation();
        const results = await page.$$eval('div.g', (elements) => {
            return elements.map((element) => {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');
                return results.push({
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                });
            });
        });
        console.log(results);
    });
});
