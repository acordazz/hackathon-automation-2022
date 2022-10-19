import { Page, Locator } from "@playwright/test";
import { Super } from "./Super";

type todoItems = {
    listPosition: number | null | undefined;
    check: boolean | null | undefined;
    todoItem: string | null | undefined;
}

export class Todo extends Super{

    readonly todoList: Locator;
    readonly addTodoButton: Locator;
    readonly todoTextBox: Locator;

    constructor (page: Page) {
        super(page);
        this.addTodoButton = page.getByRole("button", {name: "Add todo"});
        this.todoTextBox = page.getByPlaceholder('Something todo');
        this.todoList = page.locator("body > div.page > main > article > ul");       
    }
    
    async addTodoItem(item: string) {        
        await this.todoTextBox.click();
        await this.todoTextBox.fill(item);
        await this.addTodoButton.click();
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