import { test, expect, Page, Locator } from '@playwright/test';
import { assert } from 'console';
import { Home } from '../POM/home';
import { Sidebar } from '../POM/sidebar';
import { Counter } from '../POM/Counter';

let p: Page;

test.beforeEach(async ({ page }) => {
    page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test.describe("1. Lag et script som navigerer gjennom hele nettområdet. Sjekk at:", () => {
    test('A. Titlene har en fornuftig verdi (Valider at titlene er riktige) ', async ({page}) => {
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        await expect(home.mainHeader).toHaveText('Test Automation Hackaton!');

        await sidebar.counter.click();
        await expect(counter.counterHeader).toEqual('Counter');
        
    });
    test('B Valider knapper (Tekst, at de er der', async () => {

    })
})

