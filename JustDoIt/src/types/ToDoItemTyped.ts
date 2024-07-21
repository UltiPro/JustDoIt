import { ToDoType } from "../enums/ToDoType";

export type ToDoItemTyped = {
    _id: number,
    _title: string,
    _description: string,
    _toDoType: ToDoType
}