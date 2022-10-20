import { test, expect, Page, Locator, chromium } from '@playwright/test';
import { assert, count } from 'console';
import { Home } from '../POM/home';
import { Sidebar } from '../POM/sidebar';
import { Counter } from '../POM/Counter';
import { FetchData } from '../POM/FetchData';
import { Todo } from '../POM/ToDo';
import exp from 'constants';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
    
    
});

test.describe("1. Lag et script som navigerer gjennom hele nettområdet. Sjekk at:", () => {
    test('A. Titlene har en fornuftig verdi (Valider at titlene er riktige) ', async () => {
        //TODO: flytt alle variabler utafor
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        const fetchData = new FetchData(p)
        const toDo = new Todo(p)

        await expect(home.mainHeader).toHaveText('Test Automation Hackaton!');

        await sidebar.counter.click();
        await expect(counter.counterHeader).toHaveText('Counter');

        await sidebar.fetchData.click();
        await expect(fetchData.fetchDataHeader).toHaveText('Weather forecast')

        await sidebar.toDo.click();
        await expect(toDo.toDoHeader).toHaveText('Todo')
        
    });
    test('B. Valider knapper (Tekst, at de er der', async () => {
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        const toDo = new Todo(p)
        
        await expect(home.counterClickMe).toBeVisible;
        await expect(home.counterClickMe).toHaveText('Click me');

        await sidebar.counter.click();
        await expect(counter.counterClickMe).toBeVisible;
        await expect(counter.counterClickMe).toHaveText('Click me');

        await sidebar.toDo.click();
        await expect(toDo.toDoButton).toBeVisible;
        await expect(toDo.toDoButton).toHaveText('Add todo');
    });
})

test.describe("2. Lag et script som trykker på knapper. Valider at knappene gjør det de skal gjøre", () => {
    test('A. Lag sjekker på at knappene teller opp der de skal gjøre det) ', async ({page}) => {
        const home = new Home(p)
        
        await expect(home.actualCount).toContainText('0');
        //TODO: finn bedre wait metode
        await page.waitForTimeout(1000)
        await page.locator('body > div.page > main > article > button').click();
        await expect(home.actualCount).toContainText('10');
        
    });
    test('B. Lag sjekker på at lenke til ekstern side dukker opp i ny tab', async ({page}) => {
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        const fetchData = new FetchData(p)

        await page.locator('body > div.page > main > div > a').click();
        await page.waitForTimeout(2000);
        
        const [newPage] = await Promise.all([
            page.context.waitForEvent(),
            page.click('a[target="_blank"]') // Opens a new tab
          ])
          await newPage.waitForLoadState();
        await (await page.context().newPage())
        await expect(page).toHaveURL('https://learn.microsoft.com/en-gb/aspnet/core/?view=aspnetcore-6.0')
    });
})

