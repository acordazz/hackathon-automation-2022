import { test, Page } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { Todo } from '../POM/Todo';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('Enkelt: 1. Lag et script som navigerer seg igjennom hele nettområdet. Scriptet skal klikke på alle menyvalgene', async () => {
    const sidebar = new Sidebar(p);
    const testData = [
        {locator: sidebar.toDo, text: "To do"},
        {locator: sidebar.home, text: "Home"},
        {locator: sidebar.counter, text: "Counter"},
        {locator: sidebar.fetchData, text: "Fetch data"},
        {locator: sidebar.hackathonWebApp, text: "Home"},
    ]
    for (const header of testData) {
        await header.locator.click();
        await sidebar.highlighted.filter({ hasText: header.text}).waitFor();
    }
});

test('Enkelt: 3. Lag et script som legger til elementer i To Do listen.', async () => {
    const sidebar = new Sidebar(p);
    const todo = new Todo(p);
    const totalTexts = 5;

    await test.step(`Adding items to Todo list. Total items: ${totalTexts}`, async() => {
        await sidebar.toDo.click();
        await p.waitForTimeout(1000);
        for (let text = 1; text <= totalTexts; text++) {
            await todo.addTodoItem(`Adding item ${text}`);
            await p.waitForTimeout(200);
        }}); 

});