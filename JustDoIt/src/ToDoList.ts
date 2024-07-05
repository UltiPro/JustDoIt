import ToDoItem from "./models/ToDoItem";

export default class ToDoList {
    private static _instance: ToDoList | null = null;

    private list: ToDoItem[];

    private constructor() {
        this.list = [];
    }

    public static get Instance(): ToDoList {
        if (ToDoList._instance == null) ToDoList._instance = new ToDoList();
        return ToDoList._instance;
    }
}