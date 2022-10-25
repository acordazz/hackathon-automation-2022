import test, { expect } from "../fixtures/pages";


test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
});

test.describe('1. Lag et script som navigerer seg igjennom hele nettområdet. Scriptet skal klikke på alle menyvalgene', () => {

    test('should navigate through each link on the sidebar', async ({ sidebar }) => {

        //click on sidebar-navigation-links
        await sidebar.counter.click();
        await sidebar.hackathonWebApp.click();
        await sidebar.fetchData.click();
        await sidebar.toDo.click();
        await sidebar.home.click();
    });

    test('should navigate through each link on the sidebar and check that the tab-titles matches', async ({ page, sidebar }) => {

        await sidebar.counter.click();
        await expect(page).toHaveTitle('Counter');
        await sidebar.fetchData.click();
        await expect(page).toHaveTitle('Weather forecast');
        await sidebar.toDo.click();
        await expect(page).toHaveTitle('Todo');
        await sidebar.home.click();
        await expect(page).toHaveTitle('HackatonWebApp');
    });

    test('should click on the counter-btn inside of counterpage and count', async ({ sidebar, counter }) => {
        await sidebar.counter.click();
            for(let c = 0; c < 1; c++) {
                await expect(counter.currentCount).toContainText((c).toString());
                await counter.counterClickMe.click();
                await expect(counter.currentCount).toContainText((c * 1).toString());
            }
    });

    test('should click on the counter-btn on homepage and count', async ({ sidebar, home }) => {
        await sidebar.home.click();
        await home.counterClickMe.click();
            for(let h = 0; h < 5; h++) {
                await expect(home.currentCount).toContainText((h).toString());
                await home.counterClickMe.click();
                await expect(home.currentCount).toContainText((h * 5).toString());
        }
     });
});