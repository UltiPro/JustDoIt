import BuildToDoItem from "../decorators/BuildToDoItem";
import IIndexable from "../interfaces/IIndexable";
import ToDoList from "../ToDoList";
import { ToDoType } from "../enums/ToDoType";

@BuildToDoItem()
export default class ToDoItem implements IIndexable {
    _id: number;
    private _title: string;
    private _description: string;
    private _toDoType: ToDoType;

    constructor(_title: string, _description: string, _toDoType: ToDoType);
    constructor(_title: string, _description: string, _toDoType: ToDoType, _id: number);
    constructor(_title: string, _description: string, _toDoType: ToDoType, _id?: number) {
        this._id = _id ?? ToDoList.Instance.GenerateId();
        this._title = _title;
        this._description = _description;
        this._toDoType = _toDoType;
    }

    public get Id(): number {
        return this._id;
    }

    public set Id(_id: number) {
        this._id = _id;
    }

    public get Title(): string {
        return this._title;
    }

    public set Title(_title: string) {
        if (_title.length < 3 || _title.length > 64)
            throw new Error("Title has to be minimum 3 characters long and maximum 64 characters long.");
        this._title = _title;
    }

    public get Description(): string {
        return this._description;
    }

    public set Description(_description: string) {
        if (_description.length > 256)
            throw new Error("Description has to be maximum 256 characters long.");
        this._description = _description;
    }

    public get ToDoType(): ToDoType {
        return this._toDoType;
    }

    public set ToDoType(_toDoType: ToDoType) {
        this._toDoType = _toDoType;
    }
}