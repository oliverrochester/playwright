
// @ts-check

const testCases = require('../test.json')
const credentials = require('../credentials.json')
const tests = testCases.testCases
const { test, expect } = require('@playwright/test');

//loop through all test cases from the test.json file
for (let i = 0; i < tests.length; i++){

  test(`Test Case ${i + 1}`, async ({ page }) => {
    //navigate to site and login
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    await page.locator('#username').fill(credentials.username);
    await page.locator('#password').fill(credentials.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    //navigate to necessary page of the site
    await page.getByRole('button', { name : tests[i].page }).click()

    //get the container element of the correct column on the board and assert presence (To Do, In Progress, etc..)
    const columnContainer = page.getByRole('heading', { name : tests[i].column }).locator('..') //retrieving the column container (To Do, In Progress, etc...)
    await expect(columnContainer).toBeVisible({timeout:10000})

    //get the title of the ticket within the associated column and assert presence
    const ticketTitle = columnContainer.getByRole('heading', { name: tests[i].ticketTitle})
    await expect(ticketTitle).toBeVisible({timeout:10000});

    //get parent container element of ticket title for searching it's sub-elements
    const ticketContainer = ticketTitle.locator('..')

    //loops through all tags and asserts text match within the associated ticket
    for(let x = 0; x < tests[i].tags.length; x++){
      const tag = ticketContainer.locator('span').nth(x)
      await expect(tag).toHaveText(tests[i].tags[x])
    }

  });
}


