"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
// @ts-check
//test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
test_1.test.describe('chromium only', () => {
    test_1.test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
    (0, test_1.test)('has ititle', async ({ page }) => {
        await page.goto('https://edition.cnn.com');
        //expect title to have "home"
        await (0, test_1.expect)(page).toHaveTitle(/CNN International/);
    });
    (0, test_1.test)('click on new word', async ({ page }) => {
        //await page.locator('.navList a[href="https://www.ynet.co.il/news"] span :text(" חדשות")').click({force:true});
        await page.getByRole("link", { name: 'world' });
    });
    (0, test_1.test)('check if text exist ', async ({ page }) => {
        await (0, test_1.expect)(page.locator('.container__headline.container_lead-plus-headlines__headline')).toHaveText("This country wanted a 69-hour workweek. Millennials and Generation Z had other ideas");
    });
});
