import { Locator, Page } from "@playwright/test";

export class Counter {

    readonly page: Page;
    readonly counterHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.counterHeader = page.locator('body >> div.page >> main >> article >> h1');
        
    }
}