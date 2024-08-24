import IStorage from "../interfaces/IStorage";
import ToDoItem from "./ToDoItem";
import { ToDoItemTyped } from "../types/ToDoItemTyped";
import { ToDoType } from "../enums/ToDoType";
import { ToJSON, FromJSON } from "../utils/ToDoItemConverter";

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
        localStorage.setItem("todolist", JSON.stringify(this.list.map((toDoItem: ToDoItem) => ToJSON(toDoItem))));
    }

    public Load(): void {
        this.list = (JSON.parse(localStorage.getItem("todolist") ?? "[]") as ToDoItemTyped[])
            .map((toDoItemTyped: ToDoItemTyped) => FromJSON(toDoItemTyped));
    }

    public Clear(): void {
        this.list = [];
        this.Save();
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

    public RelocateObjById(objId: number, toObjId: number): void {
        if (objId === toObjId) return;
        const toDoItemArrayId: number = this.list.findIndex((toDoItem: ToDoItem) => toDoItem.Id == objId);
        const toDoItemToArrayId: number = this.list.findIndex((toDoItem: ToDoItem) => toDoItem.Id == toObjId);
        if (toDoItemArrayId < 0 || toDoItemToArrayId < 0) return;
        this.list.splice(toDoItemArrayId > toDoItemToArrayId ? toDoItemToArrayId : toDoItemToArrayId - 1, 0, this.list.splice(toDoItemArrayId, 1)[0]);
        this.Save();
    }

    public GenerateId(): number {
        return this.list.length === 0 ? 0 : this.list[this.list.length - 1].Id + 1;
    }
}