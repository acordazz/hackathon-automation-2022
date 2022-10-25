import { test, Page, expect } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { FetchData } from '../POM/FetchData';
import { Home } from '../POM/Home';
import { DateTime } from 'luxon';

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

test('Hard: 3.	Lag et script som trykker på trommen i siden som det lenkes til i den grå boksen.', async () => {
    const home = new Home(p);
    let page1;
    await test.step(`Clicking on link to drums page and waiting for it to load.`, async () => {
        page1 = await home.clickOnDrumsLink();
    });
    expect(page1, 'Verifying that popup for drums is opened').not.toBeNull();
    await test.step(`Added a small timeout to record drums.`, async () => {
        await p.waitForTimeout(3 * 1000);
    });
});