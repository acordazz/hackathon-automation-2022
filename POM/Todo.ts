import { Page, Locator } from "@playwright/test";

type todoItems = {
    listPosition: number | null | undefined;
    check: boolean | null | undefined;
    todoItem: string | null | undefined;
}

export class Todo {

    readonly page: Page;
    readonly todoList: Locator;
    readonly title: Locator;

    constructor (page: Page) {
        this.page = page;
        this.todoList = page.locator("body > div.page > main > article > ul");
        this.title = page.locator('h3', { hasText: 'Todo' });
    }
    
    async addTodoItem(item: string) {        
        await this.page.getByPlaceholder('Something todo').click();
        await this.page.getByPlaceholder('Something todo').fill(item);
        await this.page.getByRole('button', { name: 'Add todo' }).click();
    }

    // async isItemAdded(item: string) {
    //     const isItemAdded = ((await this.todoList.locator('input', {hasText: item}).innerText({ timeout: 3000})) == item);
    //     return isItemAdded;
    // }

    async getTodoItemsList() {
        
        const itemsList = await this.page.getByRole("list");
        return itemsList;

    }
}