import { Page, Locator } from "@playwright/test";

export class Super {

    readonly page: Page;
    readonly title: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.getByRole("heading");        
    }

    extractCounter(counterText: string, substringToRemove: string): number {
        return Number(counterText.slice(counterText.lastIndexOf(substringToRemove) + substringToRemove.length));
    }
}