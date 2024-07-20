import { ToDoType } from "../enums/ToDoType";

export default interface IStorage<T extends object> {
    Save(): void;
    Load(): void;
    Clear(): void;
    Add(obj: T): void;
    Edit(id: number, title?: string, description?: string, _toDoType?: ToDoType): void;
    Delete(id: number): void;
};