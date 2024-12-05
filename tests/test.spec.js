
// @ts-check

const testCases = require('../test.json')
const credentials = require('../credentials.json')
const tests = testCases.testCases
const { test, expect } = require('@playwright/test');

for (let i = 0; i < tests.length; i++){
  test(`Test Case ${i + 1}`, async ({ page }) => {
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    await page.locator('#username').fill(credentials.username);
    await page.locator('#password').fill(credentials.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name : tests[i].page }).click()
    const columnContainer = page.getByRole('heading', { name : tests[i].column }).locator('..') //retrieving the column container (To Do, In Progress, etc...)
    await expect(columnContainer).toBeVisible({timeout:10000})
    const itemTitle = columnContainer.getByRole('heading', { name: tests[i].itemTitle})
    await expect(itemTitle).toBeVisible({timeout:10000});
    const itemContainer = itemTitle.locator('..')
    for(let x = 0; x < tests[i].tags.length; x++){
      const tag = itemContainer.locator('span').nth(x)
      await expect(tag).toHaveText(tests[i].tags[x])
    }
  });
}


