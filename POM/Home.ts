import { Locator, Page } from "@playwright/test";


export class Home{

    readonly page: Page;
    readonly counterTitle: Locator;
    readonly mainTitle: Locator;
    readonly counterClickMe: Locator;
    readonly grayText: Locator;
    readonly drumsLink: Locator;
    readonly currentCount: Locator;

    constructor (page: Page) {
        this.page = page;
        this.counterTitle = page.locator('h1',  { hasText: 'Counter' });
        this.mainTitle = page.locator('h1', { hasText: 'Test Automation Hackaton!' });
        this.counterClickMe = page.locator('.btn');   
        this.grayText = page.locator("body > div.page > main > article > div > strong");
        this.drumsLink = page.getByRole('link', { name: 'Test av en lyd, bilde av en tromme!' });
        this.currentCount = page.locator('[role="status"]');
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
}