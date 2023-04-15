import {test,expect} from "@playwright/test";
// @ts-check
//test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
test.describe('chromium only', () => {
    test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
    test('has ititle',async ({page})=>{
        await page.goto('https://edition.cnn.com');
        //expect title to have "home"
        await expect(page).toHaveTitle(/CNN International/)
    });
    test('click on new word', async ({page})=>{
        //await page.locator('.navList a[href="https://www.ynet.co.il/news"] span :text(" חדשות")').click({force:true});
        await page.getByRole("link",{ name: 'world'} )
    })
    test('check if text exist ',async ({page})=>{
        await expect(page.locator('.container__headline.container_lead-plus-headlines__headline')).toHaveText("This country wanted a 69-hour workweek. Millennials and Generation Z had other ideas")
    })

});
