import { test, expect, Page, Locator, chromium } from '@playwright/test';
import { assert, count } from 'console';
import { Home } from '../POM/home';
import { Sidebar } from '../POM/sidebar';
import { Counter } from '../POM/Counter';
import { FetchData } from '../POM/FetchData';
import { Todo } from '../POM/ToDo';
import exp from 'constants';
import { strict } from 'assert';

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
    test('B-C. Lag sjekker på at lenke til ekstern side dukker opp i ny tab. Sjekk at siden som kommer opp er www.trommelyd.no', async ({page}) => {
        
        const context = await page.context();
        const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('body > div.page > main > article > div > span.text-nowrap > a') // Opens a new tab
        ])
        await newPage.waitForLoadState();
        
        await expect(newPage).toHaveURL('https://trommelyd.no')
    });
    test('D. Lag en test på at du trykker på counter knappene ti ganger', async ({page}) => {
        await test.step('Homepage', async() => {
            const home = new Home(p)
            
            await page.waitForTimeout(1000)
            for(let i= 0; i < 10; i++){
                //TODO: finn bedre wait metode
                await expect(home.actualCount).toContainText((i).toString())
                await page.locator('body > div.page > main > article > button').click();
                await expect(home.actualCount).toContainText((i * 10).toString());
            }
        })
        await test.step('Counterpage', async () => {
            const sidebar = new Sidebar(p)
            await sidebar.counter.click();
            await page.waitForTimeout(1500)
            
            for(let i = 0; i<10; i++){
                await expect(page.locator('body > div.page > main > article > p')).toContainText(i.toString())
                await page.locator('body > div.page > main > article > button').click()
                await expect(page.locator('body > div.page > main > article > p')).toContainText((i + 1).toString())
            }
        })
    })
})

