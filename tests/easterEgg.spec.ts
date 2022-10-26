import { test, Page, Locator, expect } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';
import { Counter } from '../POM/Counter';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});


test("EasterEgg?", async ({page}) => {
            const counter = new Counter(p);
            const sidebar = new Sidebar(p);
            await sidebar.counter.click();
            
            for(let i = 0; i<44; i++){
                await counter.waitForCounterNumber(i);
                await counter.counterClickMe.click();
            }
            await expect(counter.currentCount).toContainText("100001");
})
