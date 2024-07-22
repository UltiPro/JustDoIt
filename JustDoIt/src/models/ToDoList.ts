import IStorage from "../interfaces/IStorage";
import ToDoItem from "./ToDoItem";
import { ToDoItemTyped } from "../types/ToDoItemTyped";
import { ToDoType } from "../enums/ToDoType";

export default class ToDoList implements IStorage<ToDoItem> {
    private static _instance: ToDoList | null = null;

    private list: ToDoItem[] = [];

    private constructor() {
        this.Load();
    }

    public static get Instance(): ToDoList {
        if (ToDoList._instance === null) ToDoList._instance = new ToDoList();
        return ToDoList._instance;
    }

    public Save(): void {
        localStorage.setItem("todolist", JSON.stringify(this.list.map((toDoItem: ToDoItem) => this.ToJSON(toDoItem))));
    }

    public Load(): void {
        this.list = (JSON.parse(localStorage.getItem("todolist") ?? "[]") as ToDoItemTyped[])
            .map((toDoItemTyped: ToDoItemTyped) => this.FromJSON(toDoItemTyped));
    }

    public Clear(): void {
        this.list = [];
        this.Save();
    }

    private ToJSON(toDoItem: ToDoItem): ToDoItemTyped {
        return {
            _id: toDoItem.Id,
            _title: toDoItem.Title,
            _description: toDoItem.Description,
            _toDoType: toDoItem.ToDoType
        };
    }

    private FromJSON(toDoItemTyped: ToDoItemTyped): ToDoItem {
        return new ToDoItem(toDoItemTyped._title, toDoItemTyped._description, toDoItemTyped._toDoType, toDoItemTyped._id);
    }

    public Add(obj: ToDoItem): void {
        this.list.push(obj);
        this.Save();
    }

    public Edit(id: number, ...args: [string, string, ToDoType]): void {
        const toDoItem: ToDoItem | undefined = this.list.find((toDoItem: ToDoItem) => toDoItem.Id === id);
        if (!toDoItem) return;
        toDoItem.Title = args[0];
        toDoItem.Description = args[1];
        toDoItem.ToDoType = args[2];
        this.Save();
    }

    public Delete(id: number): void {
        const toDoItem: ToDoItem | undefined = this.list.find((toDoItem: ToDoItem) => toDoItem.Id === id);
        if (!toDoItem) return;
        this.list.splice(this.list.indexOf(toDoItem), 1);
        this.Save();
    }

    public GenerateId(): number {
        return this.list.length === 0 ? 0 : this.list[this.list.length - 1].Id + 1;
    }
}