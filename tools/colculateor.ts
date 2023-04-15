import {chromium, Browser, Page} from "@playwright/test";
import * as fs from 'fs';


export async function calculateAverageLoadTime(results: any[]): Promise<number> {
    let totalLoadTime = 0;
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    for (const result of results) {
        const time = Date.now();
        await Promise.all([
            page.goto(result.link),
            page.waitForNavigation(),
        ]);
        const timeSpent = (Date.now() - time) / 1000;
        result.loadtime = timeSpent.toString();
        totalLoadTime += timeSpent;
    }
    const averageTime = totalLoadTime / results.length;
    await browser.close();
    return averageTime;
}
export async  function writeObjectToJsonFile(objectToWrite: object, filePath: string) {
    const resultJson = JSON.stringify(objectToWrite);
    fs.writeFileSync(filePath, resultJson);
    console.log(`JSON written to ${filePath}:`, resultJson);
}
