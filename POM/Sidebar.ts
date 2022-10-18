import { Locator, Page } from "@playwright/test";

export class Sidebar {

    readonly page: Page;
    readonly hackathonWebApp: Locator;
    readonly home: Locator;
    readonly counter: Locator;
    readonly fetchData: Locator;
    readonly toDo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hackathonWebApp = page.locator('text=HackatonWebApp');
        this.home = page.locator("body > div.page > div > div.collapse > nav > div:nth-child(1) > a");
        this.counter = page.locator("body > div.page > div > div.collapse > nav > div:nth-child(2) > a");
        this.fetchData = page.locator("body > div.page > div > div.collapse > nav > div:nth-child(3) > a");
        this.toDo = page.locator("body > div.page > div > div.collapse > nav > div:nth-child(4) > a");
    }
}