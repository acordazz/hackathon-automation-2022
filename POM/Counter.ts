import { Page, Locator } from "@playwright/test";
import { Super } from './Super';

export class Counter extends Super{

    readonly currentCount: Locator;
    readonly counterClickMe: Locator;
    readonly header: Locator;

    constructor (page: Page) {
        super(page);
        this.currentCount = page.locator('body > div.page > main > article > p');
        this.counterClickMe = page.locator('.btn');  
        this.header = page.locator('body > div.page > main > article > h1'); 
    }

    async waitForCounterNumber(n: number) {
        await this.page.waitForSelector(`body > div.page > main > article > p >> text="Current count: ${n}"`);
    }
}