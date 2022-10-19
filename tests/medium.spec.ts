import { test, Page, Locator, expect } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { FetchData } from '../POM/FetchData';
import { Counter } from '../POM/Counter';
import { Todo } from '../POM/Todo';
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