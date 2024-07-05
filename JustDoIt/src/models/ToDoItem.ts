export default class ToDoItem {
    private _title: string;
    private _description: string;
    private _imgPath: string;

    public constructor(title: string, description: string, imgPath: string){
        this._title = title;
        this._description = description;
        this._imgPath = imgPath;
    }

    public get Title(): string {
        return this._title;
    }

    public set Title(_title: string) {
        if(_title.length < 0)
            throw new Error("Title has to be minimum 3 characters long and maximum 64 characters long.");
    }
}