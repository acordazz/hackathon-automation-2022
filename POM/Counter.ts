import { Page, Locator } from "@playwright/test";

export class Counter {

    readonly page: Page;
    readonly currentCount: Locator;
    readonly counterClickMe: Locator;
    readonly counterHeader: Locator;

    constructor (page: Page) {
        this.page = page;
        this.currentCount = page.locator('text:right-of(:text("Current count: "))');
        //this.currentCount = page.locator('body > div.page > main > article > p')        
        this.counterClickMe = page.locator('text=Click me');
        this.counterHeader = page.locator('body > div.page > main > article > h1');
    }
}