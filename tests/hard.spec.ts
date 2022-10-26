import { test, Page, expect } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { FetchData } from '../POM/FetchData';
import { Home } from '../POM/Home';
import { DateTime } from 'luxon';
import { Todo } from '../POM/Todo';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('Hard: 1. Lag et script som sjekker at datoene som hentes opp i Weather Forecast er i morgen og utover, 10 dager frem i tid', async () => {
    const sidebar = new Sidebar(p);
    const fetchData = new FetchData(p);
    let allDates;
    await test.step(`Getting temperature data.`, async () => {
        await sidebar.fetchData.click({ timeout: 2000 });
        allDates = await fetchData.getTableContents();
    });
    let previousDay = DateTime.now().startOf('day'); //MM/DD/YYYY
    for (const date of allDates){
        if (date.date != null ) {
            const newDate = DateTime.fromFormat(date.date, "MM/d/yyyy");
            const dateDiff = newDate.diff(previousDay, 'days').days;
            expect(dateDiff, `Verifying that date difference is one day. Previous: '${previousDay.toLocaleString()}', actual: '${newDate.toLocaleString()}'. Diff: ${dateDiff}`).toEqual(1);
            previousDay = newDate;
        }
    }
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

    await test.step('Checking the checkboxes', async() => {
        let tableContents;
        await test.step('Clicking on checkboxes', async () => {
            tableContents = await todo.getTableContents();});
        for (const line of tableContents) {
            expect(await line.check, `Line ${line.todo}, is checked: ${line.check}`).toBeTruthy();
        }
    }); 
    
});

test('Hard: 3.	Lag et script som trykker på trommen i siden som det lenkes til i den grå boksen.', async () => {
    const home = new Home(p);
    let page1;
    await test.step(`Clicking on link to drums page and waiting for it to load.`, async () => {
        page1 = await home.clickOnDrumsLink();
    });
    expect(page1, 'Verifying that popup for drums is opened').not.toBeNull();
    await test.step(`Testing whether we receive sound of drums.`, async () => {
        type req = {
            method: string, url: string,
        };
        type res = {
            status: string, url: string,
        }
        const requests: req[] = [];
        const responses: res[] = [];
        page1.on('request', request =>
            {
                console.log('>>', request.method(), request.url());
                requests.push({method: request.method(), url: request.url()});
        });
        page1.on('response', response =>
            {
                console.log('<<', response.status(), response.url());
                responses.push({status: response.status(), url: response.url()});
            });
        const response = await page1.getByRole('img', { name: 'Tromme' }).click();
        const soundFound = responses.find((obj) => {
            return obj.status == "206" && obj.url == "https://trommelyd.no/media/trommelyd.mp3"; 
        }) != undefined;
        expect(soundFound, `Verifying whether clicking on drums gets trommelyd.mp3 as response`).toBeTruthy();

    });
});