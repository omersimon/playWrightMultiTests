import {test, expect} from "@playwright/test";

test.describe('chromium only', () => {
    test.only('go to google ans search car  ', async ({page}) => {
     §
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
    })
});
