import { test, expect, Page } from '@playwright/test';
import { Home } from '../POM/home';
import { Sidebar } from '../POM/sidebar';
import { Todo } from '../POM/Todo';

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

test(`EXTRA: test todo`, async () => {
    const sidebar = new Sidebar(p);
    await sidebar.toDo.click();
    const todo = new Todo(p);
    const isItemAdded = await todo.addTodoItem("test item");
    expect(isItemAdded).toBeTruthy();
});