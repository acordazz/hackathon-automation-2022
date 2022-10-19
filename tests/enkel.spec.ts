import { test, Page } from '@playwright/test';
import { Sidebar } from '../POM/sidebar';

let p: Page;

test.beforeEach(async ({ page }) => {
    await page.goto("https://hackatonwebapp.azurewebsites.net/");
    p = page;
});

test('1. Lag et script som navigerer seg igjennom hele nettområdet. Scriptet skal klikke på alle menyvalgene', async () => {
    const sidebar = new Sidebar(p);
    await sidebar.toDo.click({ timeout: 2000 });
    await sidebar.counter.click({ timeout: 2000 });
    await sidebar.fetchData.click({ timeout: 2000 });
    await sidebar.hackathonWebApp.click({ timeout: 2000 });
    await sidebar.home.click({ timeout: 2000 });
});