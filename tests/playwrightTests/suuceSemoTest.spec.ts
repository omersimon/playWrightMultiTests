import {test} from '@playwright/test';

test.describe('Sauce Demo Login', () => {
    let users
    test.beforeAll(async ({browser}) => {
        const page = await browser.newPage();
        await page.goto("https://www.saucedemo.com/");
        users = await page.$$eval('.login_credentials', (elements) => {
            const childNodes = Array.from(elements[0].childNodes);
            const usersArray = childNodes
                .filter((node) => node.nodeType === Node.TEXT_NODE)
                .map((node) => node.textContent.trim());
            return usersArray;
        });
        console.log(users);
    });
    test('receive all user and password from site', async ({ browser }) => {
       const failUsers= await loginWithmuiltyUsers(users, "secret_sauce",browser)
        console.log (`those name fail to login" ${failUsers.failedUsers} : ->in  total :${failUsers.failureCount} failure`);
    });
    // other test steps...
    async function loginWithmuiltyUsers(users, password,browser) {
        const failedUsers=[];
        let failureCount = 0;
        for (const user of users) {
            const page = await browser.newPage();
            try {
                await page.goto("https://www.saucedemo.com/", {timeout: 5000});
                await page.locator('[data-test="username"]').type(user);
                await page.locator('[data-test="password"]').type(password);
                await Promise.all([
                    page.click('[data-test="login-button"]'),
                    page.waitForNavigation({waitUntil: 'networkidle'}),
                    page.waitForSelector('.app_logo', {timeout: 8000})
                ]);
                console.log(`Logged in as ${user}`);
            } catch (e) {
                console.log(`Login failed for ${user}: ${e}`);
                failedUsers.push(user);
                failureCount++;
                page.reload();
                continue;
            }
        }
        return{failedUsers,failureCount};
    }
}); // closing curly brace for test.describe
