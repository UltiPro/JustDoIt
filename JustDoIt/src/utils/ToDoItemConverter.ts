import ToDoItem from "../models/ToDoItem";
import { ToDoItemTyped } from "../types/ToDoItemTyped";

export function ToJSON(toDoItem: ToDoItem): ToDoItemTyped {
    return {
        _id: toDoItem.Id,
        _title: toDoItem.Title,
        _description: toDoItem.Description,
        _toDoType: toDoItem.ToDoType,
        _date: Date.parse(toDoItem._date.toString())
    };
}

export function FromJSON(toDoItemTyped: ToDoItemTyped): ToDoItem {
    return new ToDoItem(toDoItemTyped._title, toDoItemTyped._description, toDoItemTyped._toDoType, toDoItemTyped._id, new Date(toDoItemTyped._date));
}