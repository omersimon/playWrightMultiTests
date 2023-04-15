"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
test_1.test.describe('chromium only', () => {
    (0, test_1.test)('go to google ans search car  ', async ({ page }) => {
        await page.goto('https://google.co.il');
        await page.locator('input[name="q"]').type('cars');
        await page.waitForTimeout(1000);
        await page.locator('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]').click();
        await page.waitForNavigation();
        let totalLoadTime = 0;
        const results = await page.$$eval('div.g', async (elements, page) => {
            return await Promise.all(elements.map(async (element) => {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');
                const time = Date.now();
                await page.goto(link.href, { timeout: 60000 });
                await page.waitForNavigation({ timeout: 100000 });
                const timeSpent = (Date.now() - time) / 1000;
                totalLoadTime += timeSpent;
                return {
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                    loadtime: timeSpent.toString(),
                };
            }));
        }, page);
        const avarageTime = totalLoadTime / results.length;
        const finalResult = { results, avarageTime };
        console.log(results);
        const resultJson = JSON.stringify(finalResult);
        const filename = 'omer2.json';
        const filePath = path.join(__dirname, filename); // generate the file path
        fs.writeFileSync(filePath, resultJson);
        console.log("this is json ", resultJson);
    });
});
