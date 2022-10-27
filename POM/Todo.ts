import { Page, Locator } from "@playwright/test";
import { Super } from "./Super";

export type todoItems = {
    check: boolean | null | undefined;
    todo: string | null | undefined;
}

export class Todo extends Super{

    readonly todoList: Locator;
    readonly addTodoButton: Locator;
    readonly todoTextBox: Locator;
    readonly header: Locator;

    constructor (page: Page) {
        super(page);
        this.addTodoButton = page.getByRole("button", {name: "Add todo"});
        this.todoTextBox = page.getByPlaceholder('Something todo');
        this.todoList = page.locator("body > div.page > main > article > ul");
        this.header = page.getByRole('heading', {name: "Todo"});       
    }
    
    async addTodoItem(item: string) {        
        await this.todoTextBox.click();
        await this.page.waitForTimeout(200);
        await this.todoTextBox.fill(item);
        await this.page.waitForTimeout(200);
        await this.addTodoButton.click();
        await this.page.waitForTimeout(200);
    }

    // async isItemAdded(item: string) {
    //     const isItemAdded = ((await this.todoList.locator('input', {hasText: item}).innerText({ timeout: 3000})) == item);
    //     return isItemAdded;
    // }

    async getTodoItemsList() {
        
        const itemsList = await this.page.getByRole("list");
        return itemsList;

    }

    async getTableContents(): Promise<todoItems[]> {
        const allItems: todoItems[] = [];
        const textboxes = this.page.locator('body > div.page > main > article > ul > li > input:nth-child(2)');
        const checkboxes = this.page.locator('body > div.page > main > article > ul > li > input:nth-child(1)');
        for (let i = 0; i < await textboxes.count(); i++) {
            await checkboxes.nth(i).click();
            allItems.push({ check: await checkboxes.nth(i).isChecked(), todo: await textboxes.nth(i).inputValue()});
        }
        return allItems;
    }
}