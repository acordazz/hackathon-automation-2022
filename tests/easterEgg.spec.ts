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
            await page.waitForTimeout(1500);
            
            for(let i = 0; i<18; i++){
                // await counter.waitForCounterNumber(i);
                await counter.counterClickMe.click();
            }
            await expect(counter.currentCount, `Expecting counter at 18th click to be '10001'`).toContainText("10001");
})
