import { test, Page, expect } from '@playwright/test';
import { Counter } from '../POM/Counter';
import { Home } from '../POM/Home';
import { Sidebar } from '../POM/sidebar';
import { Todo } from '../POM/Todo';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('Enkel 1. Lag et script som navigerer seg igjennom hele nettområdet. Scriptet skal klikke på alle menyvalgene', async () => {
    const sidebar = new Sidebar(p);
    const testData = [
        {locator: sidebar.toDo, text: "To do"},
        {locator: sidebar.home, text: "Home"},
        {locator: sidebar.counter, text: "Counter"},
        {locator: sidebar.fetchData, text: "Fetch data"},
        {locator: sidebar.hackathonWebApp, text: "Home"},
    ]
    for (const header of testData) {
        await header.locator.click();
        await sidebar.highlighted.filter({ hasText: header.text}).waitFor();
    }
});

test('Enkel 2. Lag et script som klikker på Counter knappene. Se at tallene teller opp. Merk dere hvordan strukturen er på tellingen og at det er forskjell på forsiden og Countersiden.', async ({page}) => {
    await test.step('Homepage', async() => {
        const home = new Home(p)
        
        await page.waitForTimeout(1000)
        for(let i= 0; i < 10; i++){
            await expect(home.currentCount, `Expect counter at Home to contain number ${i}`).toContainText((i).toString());
            await home.counterClickMe.click();
            await expect(home.currentCount, `Expect counter at Home to contain number ${i*10}`).toContainText((i * 10).toString());
        }
    })
    await test.step('Counterpage', async () => {
        const counter = new Counter(p);
            const sidebar = new Sidebar(p);
            await sidebar.counter.click();
            await page.waitForTimeout(1500)
            
            for(let i = 0; i<10010; i++){
                await counter.waitForCounterNumber(i);
                await expect(counter.currentCount, `Expect counter at Counter to contain number ${i}`).toContainText(i.toString())
                await counter.counterClickMe.click()
                if (i == 5){
                    i = 6
                await expect(counter.currentCount).not.toContainText((i).toString())
                }
                else if(i == 18){
                    i = 10000
                    await expect(counter.currentCount).not.toContainText("18");
                await counter.waitForCounterNumber(i+1);
                await expect(counter.currentCount, `Expect counter at Home to contain number ${i+1}`).toContainText((i + 1).toString())
    }}})
})

test('Enkel 3. Lag et script som legger til elementer i To Do listen.', async () => {
    const sidebar = new Sidebar(p);
    const todo = new Todo(p);
    const totalTexts = 5;

    await test.step(`Adding items to Todo list. Total items: ${totalTexts}`, async() => {
        await sidebar.toDo.click();
        await p.waitForTimeout(1000);
        for (let text = 1; text <= totalTexts; text++) {
            await todo.addTodoItem(`Adding item ${text}`);
            await p.waitForTimeout(200);
        }}); 

});