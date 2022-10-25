import { Page, Locator } from "@playwright/test";

export class Counter {

    readonly page: Page;
    readonly currentCount: Locator;
    readonly counterClickMe: Locator;
    readonly title: Locator;

    constructor (page: Page) {
        this.page = page;
        //this.currentCount = page.locator('text:right-of(:text("Current count: "))');
        this.currentCount = page.locator('[role="status"]');
        this.counterClickMe = page.locator('.btn');      
        this.title = page.locator('h1', { hasText: 'Counter' });          
    }
}

