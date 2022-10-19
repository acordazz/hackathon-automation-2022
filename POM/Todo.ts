import { Page, Locator } from "@playwright/test";

type todoItems = {
    listPosition: number | null | undefined;
    check: boolean | null | undefined;
    todoItem: string | null | undefined;
}

export class Todo {

    readonly page: Page;
    readonly todoList: Locator;

    constructor (page: Page) {
        this.page = page;
        this.todoList = page.locator("body > div.page > main > article > ul");       
    }
    
    async addTodoItem(item: string) {        
        await this.page.getByPlaceholder('Something todo').click();
        await this.page.getByPlaceholder('Something todo').fill(item);
        await this.page.getByRole('button', { name: 'Add todo' }).click();
        await this.page.waitForLoadState("domcontentloaded");
        const isItemAdded = await this.page.locator('li', {hasText: item}).innerText() == item;
        return isItemAdded;
    }

    async getTodoItemsList() {
        
        const itemsList = await this.page.getByRole("list");
        return itemsList;

    }
}