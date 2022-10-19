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
        this.hackathonWebApp = page.locator("a", {hasText: "HackatonWebApp"});
        this.home = page.locator("a", {hasText: "Home"});
        this.counter = page.locator("a", {hasText: "Counter"});
        this.fetchData = page.locator("a", {hasText: "Fetch data"});
        this.toDo = page.locator("a", {hasText: "To do"});
    }
}