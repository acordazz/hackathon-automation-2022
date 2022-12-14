import { Locator, Page } from "@playwright/test";
import { Super } from './Super';


export class Home extends Super{

    readonly counterTitle: Locator;
    readonly counterClickMe: Locator;
    readonly grayText: Locator;
    readonly drumsLink: Locator;
    readonly currentCount: Locator;
    readonly header: Locator;

    constructor (page: Page) {
        super(page);
        this.counterTitle = page.locator("body >> div.page >> main >> article >> h1:nth-child(4)");
        this.counterClickMe = page.getByRole("button", { name: "Click me"});
        this.grayText = page.locator("body > div.page > main > article > div > strong");
        this.drumsLink = page.getByRole('link', { name: 'Test av en lyd, bilde av en tromme!' });
        this.currentCount = page.locator('body > div.page > main > article > p:nth-child(5)');
        this.header = page.locator("body > div.page > main > article > h1:nth-child(1)");
    }

    async clickOnSomething() {
        await this.counterClickMe.click();
    }

    async clickOnDrumsLink() {
        const [page1] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.drumsLink.click()
          ]);

          return page1;
    }
    
    async waitForCounterNumber(n: number) {
        await this.page.waitForSelector(`body > div.page > main > article > p:nth-child(5) >> text="Current count: ${n}"`);
    }
}