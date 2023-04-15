import {test} from "@playwright/test";
import {calculateAverageLoadTime,writeObjectToJsonFile}  from '../../tools/colculateor'
import * as path from 'path';
test.describe('chromium only', () => {
    test('go to google ans search car  ', async ({page}) => {
        // Navigate to Google and search for "cars"
        await page.goto('https://google.com');
        await page.locator('input[name="q"]').type('cars')
        await page.waitForTimeout(1000)
        await page.locator('input[name=btnK]').click();
        await page.waitForNavigation();

        // Extract search results from the page
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
        // Calculate the average load time for the search results
        const averageTime = await calculateAverageLoadTime(results);

        // Save the search results and the average load time to a JSON file
        const filename = 'search_results.json';
        const filePath = path.join(__dirname, filename); // generate the file path
        await writeObjectToJsonFile({results, averageTime},filePath);

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
    });
    test('api tests',()=>{



    })
    test.afterEach(async ({ page }) => {
        if (page.isClosed()) {
            return;
        }

        await page.close();
    });

});
