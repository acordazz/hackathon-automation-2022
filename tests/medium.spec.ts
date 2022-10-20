import { test, Page, Locator, expect } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { FetchData } from '../POM/FetchData';
import { Counter } from '../POM/Counter';
import { Todo, todoItems } from '../POM/Todo';
import { Home } from '../POM/home';
import { Super } from '../POM/Super';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('Medium: 1 Sjekk at titlene har en fornuftig verdi (Valider at titlene er riktige)', async () => {
    const sidebar = new Sidebar(p);

    type testData = {
        header: string;
        pom: Super;
        clickOn: Locator;
    }
    const testData: testData[] = [
        {header: "Test Automation Hackaton!", pom: new Home(p), clickOn: sidebar.home},
        {header: "Counter", pom: new Counter(p), clickOn: sidebar.counter},
        {header: "Weather forecast", pom: new FetchData(p), clickOn: sidebar.fetchData},
        {header: "Todo", pom: new Todo(p), clickOn: sidebar.toDo}
    ];

    for (const subpage of testData) {
        await subpage.clickOn.click({ timeout: 2000 });
        await expect(subpage.pom.title.first()).toHaveText(subpage.header);
    }

});

test('Medium: 1 Valider knapper (Tekst, at de er der)', async () => {
    const sidebar = new Sidebar(p);

    type testData = {
        subpageLink: Locator;
        pom: Super;
        text: string;
        button: Locator;
    }

    const home = new Home(p);
    const counter = new Counter(p);
    const toDo = new Todo(p);
    const testData: testData[] = [
        {subpageLink: sidebar.counter, pom: counter, text: "Click me", button: counter.counterClickMe},
        {subpageLink: sidebar.toDo, pom: toDo, text: "Add todo", button: toDo.addTodoButton},
        {subpageLink: sidebar.home, pom: home, text: "Click me", button: home.counterClickMe}
    ]

    for (const subpage of testData) {
        await subpage.subpageLink.click({ timeout: 1000});
        await expect(subpage.button).toHaveText(subpage.text);
    }

});

test('Medium: 3. Lag et script som sjekker at du fyller To Do listen med de elementene du legger inn.', async () => {
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
    let itemsList: todoItems[] = [];
    await test.step(`Getting list of todo items after added.`, async() => {
        itemsList = await todo.getTableContents2();
    });   
    const itemsAdded: any[] = [];
    for (const item of itemsList) {
        itemsAdded.push(item.todo);
        await expect(texts, `Verifying that item '${item.todo}' added to the check list is in the original list.`).toContain(item.todo);
    }
    for (const text of texts) {
        expect(itemsAdded, `Verifying that all items in the original list have been added. Item: '${text}'`).toContain(text);
    }

});