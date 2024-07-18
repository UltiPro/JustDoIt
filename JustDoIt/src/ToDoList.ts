import IStorage from "./interfaces/IStorage";
import ToDoItem from "./models/ToDoItem";

export default class ToDoList implements IStorage<ToDoItem> {
    private static _instance: ToDoList | null = null;

    private list: ToDoItem[];

    private constructor() {
        this.list = this.Load();
    }

    public static get Instance(): ToDoList {
        if (ToDoList._instance == null) ToDoList._instance = new ToDoList();
        return ToDoList._instance;
    }

    public Save(): void {

    }

    public Load(): ToDoItem[] {
        return [];
    }
}