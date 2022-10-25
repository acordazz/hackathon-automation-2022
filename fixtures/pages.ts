import { Home } from "../POM/Home";
import { Sidebar } from "../POM/Sidebar";
import { Counter } from "../POM/Counter";
import { FetchData } from "../POM/FetchData";
import { Todo } from "../POM/Todo";

import { test as basePages } from "@playwright/test";

type pages = {
    sidebar: Sidebar;
    home: Home;
    counter: Counter;
    fetchdata: FetchData;
    todo: Todo;
}

const testpage = basePages.extend<pages>({
    sidebar: async ({ page }, use) => {
        await use(new Sidebar(page));
    },
    home: async ({ page }, use) => {
        await use(new Home(page));
    },
    counter: async ({ page }, use) => {
        await use(new Counter(page));
    },
    fetchdata: async ({ page }, use) => {
        await use(new FetchData(page));
    },
    todo: async ({ page }, use) => {
        await use(new Todo(page));
    },
});    

export default testpage;
export const expect = testpage.expect;