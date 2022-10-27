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

test.describe("Medium 1. Lag et script som navigerer gjennom hele nettområdet. Sjekk at:", () => {
    test('A. Titlene har en fornuftig verdi (Valider at titlene er riktige) ', async () => {
        //TODO: flytt alle variabler utafor
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        const fetchData = new FetchData(p)
        const toDo = new Todo(p)

        const testData = [
            {sbCounter: sidebar.home, pom: home, text: 'Test Automation Hackaton!'},
            {sbCounter: sidebar.counter, pom: counter, text: 'Counter'},
            {sbCounter: sidebar.fetchData, pom: fetchData, text: 'Weather forecast'},
            {sbCounter: sidebar.toDo, pom: toDo, text: 'Todo'},
        ];
        for (const sp of testData){
            await test.step(`Title of ${sp.text}`, async () => {
                await sp.sbCounter.click();
                await expect(sp.pom.header, `Title of ${await sp.pom.header.innerText()} should be ${sp.text}`).toHaveText(sp.text);
            });
        }
        
    });
    test('B. Valider knapper (Tekst, at de er der', async () => {
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        const toDo = new Todo(p)
        
        await expect(home.counterClickMe, `Expect counter at home to be visible`).toBeVisible();
        await expect(home.counterClickMe, `Expect button to have text 'Click me'`).toHaveText('Click me');

        await sidebar.counter.click();
        await expect(counter.counterClickMe, `Expect counter at Counter to be visible`).toBeVisible();
        await expect(counter.counterClickMe, `Expect button to have text 'Click me'`).toHaveText('Click me');

        await sidebar.toDo.click();
        await expect(toDo.addTodoButton, `Expect add button at Todo to be visible`).toBeVisible();
        await expect(toDo.addTodoButton, `Expect button to have text 'Add todo'`).toHaveText('Add todo');
    });

    test('C. Bør navigere gjennom hver enkel link i sidebar og verifisere at dokument-titlene stemmer.', async ({ page }) => {
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        const fetchData = new FetchData(p)
        const toDo = new Todo(p)

        const testData = [
            {sbCounter: sidebar.home, pom: home, text: 'HackatonWebApp'},
            {sbCounter: sidebar.counter, pom: counter, text: 'Counter'},
            {sbCounter: sidebar.fetchData, pom: fetchData, text: 'Weather forecast'},
            {sbCounter: sidebar.toDo, pom: toDo, text: 'Todo'},
        ];
        for (const sp of testData){
            await test.step(`Document title of ${sp.text}`, async () => {
                await sp.sbCounter.click();
                await expect.soft(page, `Document title of ${await page.title()} should be ${sp.text}`).toHaveTitle(sp.text);
            });
        }
    });
});

test.describe("Medium 2. Lag et script som trykker på knapper. Valider at knappene gjør det de skal gjøre", () => {
    test('A. Lag sjekker på at knappene teller opp der de skal gjøre det) ', async ({page}) => {
        const home = new Home(p)
        
        await expect(home.currentCount, `Expect counter at home to contain text '0'`).toContainText('0');
        await page.waitForTimeout(1000)
        await home.counterClickMe.click();
        await expect(home.currentCount, `Expect counter at home to contain text '1'`).toContainText('10');
        
    });
    test('B-C. Lag sjekker på at lenke til ekstern side dukker opp i ny tab. Sjekk at siden som kommer opp er www.trommelyd.no', async ({page}) => {
        const home = new Home(p);

        const newPage = await home.clickOnDrumsLink();
        await expect(newPage, `Expect new tab to have url 'https://trommelyd.no'`).toHaveURL('https://trommelyd.no')
    });
    test('D. Lag en test på at du trykker på counter knappene ti ganger', async ({page}) => {
        await test.step('Homepage', async() => {
            const home = new Home(p)
            
            await page.waitForTimeout(1000)
            for(let i= 0; i < 10; i++){
                await home.waitForCounterNumber(i*10);
                await home.counterClickMe.click();
                await home.waitForCounterNumber((i+1)*10);
                await expect(home.currentCount, `Expect counter at Home to contain number ${((i+1) * 10)}`).toContainText(((i+1) * 10).toString());
            }
        })
        await test.step('Counterpage', async () => {
            const counter = new Counter(p);
            const sidebar = new Sidebar(p);
            await sidebar.counter.click();
            await page.waitForTimeout(1500)
            
            for(let i = 0; i<10; i++){
                await counter.waitForCounterNumber(i);
                await expect(counter.currentCount, `Expect counter at Counter to contain number ${i}`).toContainText(i.toString())
                await counter.counterClickMe.click()
                if (i == 5){
                    i = 6
                await expect(counter.currentCount).not.toContainText((i).toString())
                }
                await counter.waitForCounterNumber(i+1);
                await expect(counter.currentCount, `Expect counter at Home to contain number ${i+1}`).toContainText((i + 1).toString())
            
        }})
    })
})

test('Medium 3. Lag et script som sjekker at du fyller To Do listen med de elementene du legger inn.', async () => {
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
        itemsList = await todo.getTableContents();
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