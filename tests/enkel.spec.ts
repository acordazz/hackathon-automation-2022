import { test, expect, Page } from '@playwright/test';
import { Home } from '../POM/home';
import { Sidebar } from '../POM/sidebar';
import { Todo } from '../POM/Todo';
import exp from 'constants';
import { Counter } from '../POM/Counter';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('1. Lag et script som navigerer seg igjennom hele nettområdet. Scriptet skal klikke på alle menyvalgene', async () => {
    const sidebar = new Sidebar(p);
    await sidebar.toDo.click();
    await sidebar.counter.click();
    await sidebar.fetchData.click();
    await sidebar.hackathonWebApp.click();
    await sidebar.home.click();
});
test.describe('2. Lag et script som klikker på Counter knappene. Se at tallene teller opp. Merk dere hvordan strukturen er på tellingen og at det er forskjell på forsiden og Countersiden.', async () => {
    test('Homepage', async({page}) => {
        const home = new Home(p)
        const sidebar = new Sidebar(p)
        const counter = new Counter(p)
        
        await page.waitForTimeout(1000)
        for(let i= 0; i < 5; i++){
            //TODO: finn bedre wait metode
            await expect(home.actualCount).toContainText((i).toString())
            await page.locator('body > div.page > main > article > button').click();
            await expect(home.actualCount).toContainText((i * 10).toString());
        }
    })
    test('Counterpage', async ({page}) => {
        const sidebar = new Sidebar(p)
        await sidebar.counter.click();
        await page.waitForTimeout(1500)
        
        for(let i = 1; i<10; i++){
            await expect(page.locator('body > div.page > main > article > p')).toContainText((i - 1).toString())
            page.locator('body > div.page > main > article > button').click()
            await expect(page.locator('body > div.page > main > article > p')).toContainText(i.toString())
        }
    })
})
