import { Page, Locator } from "@playwright/test";
import { Super } from './Super';

export class Counter extends Super{

    readonly currentCount: Locator;
    readonly counterClickMe: Locator;

    constructor (page: Page) {
        super(page);
        this.currentCount = page.locator('text:right-of(:text("Current count: "))');
        this.counterClickMe = page.locator('text=Click me');        
    }
}