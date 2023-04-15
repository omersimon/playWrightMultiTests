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

        const results = await page.$$eval('div.g', (elements) => {
            return elements.map((element) => {
                const link = element.querySelector('a');
                const title = element.querySelector('h3');

                return {
                    link: link?.href ?? '',
                    title: title?.textContent ?? '',
                    loadtime: "",

                };
            });
        });
        let totalLoadTime=0;
        for (const result of results) {
            const time = Date.now();
            await Promise.all([
                page.goto(result.link, {timeout: 60000}),
                page.waitForNavigation({timeout: 100000}),
            ]);
            const timeSpent = (Date.now() - time) / 1000;
            result.loadtime = timeSpent.toString();
            totalLoadTime += timeSpent;
        }
        const avarageTime = totalLoadTime / results.length
        const finalResult ={results,avarageTime}
        console.log(results);
        const resultJson = JSON.stringify(finalResult)
        const filename = 'omer2.json';
        const filePath = path.join(__dirname, filename); // generate the file path

        fs.writeFileSync(filePath, resultJson);
        console.log("this is json ",resultJson)

        //test
        // function useThePromise (myName,myFunc){
        //     const myPromise = new Promise((resolve, reject)=>{
        //         const isSuccess=true;
        //         if(isSuccess){
        //            const output= myFunc();
        //             resolve("ok " + myName+ " "+ output );
        //         }
        //         else {
        //             reject();
        //         }
        //     })
        //     return myPromise;
        // }
        // const myResult =  await useThePromise("omer",()=>{return "kokoJambo "});
        //console.log("my promise result ",myResult)
    })

});
