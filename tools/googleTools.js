"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getGoogleSearchResults(page) {
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
    return results;
}
