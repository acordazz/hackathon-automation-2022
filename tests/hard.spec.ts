import { test, expect, Page } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { Todo } from '../POM/Todo';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('Hard: 2. Lag et script som enabler/trykker på checkbox for alle item du legger inn i to do listen. Valider at den er «checked» etterpå.', async () => {
    const sidebar = new Sidebar(p);
    const todo = new Todo(p);
    const texts = [
        "Smøre på brødskiva selv!",
        "Skru av lyset om natta!",
        "Se at varmeovnene er skrudd ned noen hakk!",
        "Bli mer mijøvennlig!"
    ];

    await test.step(`Adding items to Todo list. Total items: ${texts.length}`, async() => {
        await sidebar.toDo.click({ timeout: 2000 });
        await p.waitForTimeout(2000);
        for (const text of texts) {
            await todo.addTodoItem(text);
            await p.waitForTimeout(200);
        }});

    await test.step('Checking the checkboxes', async () => {
        await p.click('body > div.page > main > article > ul > li:nth-child(1) > input[type=checkbox]:nth-child(1)')
        await p.click('body > div.page > main > article > ul > li:nth-child(2) > input[type=checkbox]:nth-child(1)')
        await p.click('body > div.page > main > article > ul > li:nth-child(3) > input[type=checkbox]:nth-child(1)')
        await p.click('body > div.page > main > article > ul > li:nth-child(4) > input[type=checkbox]:nth-child(1)')

        expect(await p.locator('body > div.page > main > article > ul > li:nth-child(1) > input[type=checkbox]:nth-child(1)').isChecked()).toBeTruthy()
        expect(await p.locator('body > div.page > main > article > ul > li:nth-child(2) > input[type=checkbox]:nth-child(1)').isChecked()).toBeTruthy()
        expect(await p.locator('body > div.page > main > article > ul > li:nth-child(3) > input[type=checkbox]:nth-child(1)').isChecked()).toBeTruthy()
        expect(await p.locator('body > div.page > main > article > ul > li:nth-child(4) > input[type=checkbox]:nth-child(1)').isChecked()).toBeTruthy()
        
        })    
    
});