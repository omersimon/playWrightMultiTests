import {test} from "@playwright/test";
import * as path from 'path';
import * as fs from 'fs';


test.describe('chromium only', () => {
    test('go to google ans search car  ', async ({page}) => {
        await page.goto('https://google.co.il');
        await page.locator('input[name="q"]').type('cars')
        await page.waitForTimeout(1000)
        await page.locator('div [jsname="aajZCb"] input[aria-label="חיפוש ב-Google"][name="btnK"][role="button"]').click();
        await page.waitForNavigation();
        let totalLoadTime=0;
        const results = await page.$$eval('div.g',async (elements,page) => {
            return await Promise.all(elements.map(async (element) => {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');
                const time = Date.now();
                await  page.goto(link.href, {timeout: 60000});
                await  page.waitForNavigation({timeout: 100000});
                const timeSpent = (Date.now() - time) / 1000;
                totalLoadTime += timeSpent;

                return {
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                    loadtime: timeSpent.toString(),

                };
            }));
        },page);

        const avarageTime = totalLoadTime / results.length
        const finalResult ={results,avarageTime}
        console.log(results);
        const resultJson = JSON.stringify(finalResult)
        const filename = 'omer2.json';
        const filePath = path.join(__dirname, filename); // generate the file path

        fs.writeFileSync(filePath, resultJson);
        console.log("this is json ",resultJson)


    })

});
