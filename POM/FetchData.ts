import { Page, Locator } from "@playwright/test";
import { Super } from './Super';

type dateType = {
    date: string | null | undefined;
    tempC: string | null | undefined;
    tempF: string | null | undefined;
    summary: string | null | undefined;
};

export class FetchData extends Super {

    readonly weatherForecastTable: Locator;

    constructor (page: Page) {
        super(page);
              
    }

    async getTableContents() {
        const allDates: dateType[] = await this.page.$$eval('body > div.page > main > article > table > tbody > tr', (users) => {
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