import { Page, Locator } from "@playwright/test";

type dateType = {
    date: string | null | undefined;
    tempC: string | null | undefined;
    tempF: string | null | undefined;
    summary: string | null | undefined;
};

export class FetchData {


    readonly page: Page;
    readonly weatherForecastTable: Locator;
    readonly title: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('h1', { hasText: 'Weather forecast' });      
    }

    async getTableContents() {
        const allDates: dateType[] = await this.page.$$eval('body > div.page > main > article > table', (users) => {
            return users.map(day => {
                const date = day.querySelector('td:nth-child(1)')?.textContent;
                const tempC = day.querySelector('td:nth-child(2)')?.textContent;
                const tempF = day.querySelector('td:nth-child(3)')?.textContent;
                const summary = day.querySelector('td:nth-child(4)')?.textContent;
                return {
                    date: date,
                    tempC: tempC,
                    tempF: tempF,
                    summary: summary
                };
            });
        });
        return allDates;
    }
}