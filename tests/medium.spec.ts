import test, { expect } from "../fixtures/pages";

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
});

test.describe('1. Lag et script som navigerer seg igjennom hele nettområdet. Scriptet skal klikke på alle menyvalgene', () => {
    test('should validate the titles', async ({ sidebar, home, counter, fetchdata, todo }) => {
        await expect(home.mainTitle).toHaveText('Test Automation Hackaton!');
        await expect(home.counterTitle).toHaveText('Counter');
        
        await sidebar.counter.click();
        await expect(counter.title).toHaveText('Counter');

        await sidebar.fetchData.click();
        await expect(fetchdata.title).toHaveText('Weather forecast');

        await sidebar.toDo.click();
        await expect(todo.title).toHaveText('Todo');
    });
});