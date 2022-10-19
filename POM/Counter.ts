import { Page, Locator } from "@playwright/test";

export class Counter {

    readonly page: Page;
    readonly currentCount: Locator;
    readonly counterClickMe: Locator;

    constructor (page: Page) {
        this.page = page;
        this.currentCount = page.locator('text:right-of(:text("Current count: "))');
        this.counterClickMe = page.locator('text=Click me');        
    }
}