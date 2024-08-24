import ToDoList from "../models/ToDoList";
import { ToDoType } from "../enums/ToDoType";
import IIndexable from "../interfaces/IIndexable";
import IDateable from "../interfaces/IDateable";
import { EditForm } from "../utils/FormModal";
import ToDoItem from "../models/ToDoItem";

const toDoContainer: HTMLDivElement = document.getElementById("todo-container")! as HTMLDivElement;
const toDoItemTemplate: HTMLTemplateElement = document.getElementById("todo-item-template")! as HTMLTemplateElement;

export default function BuildToDoItem() {
    return function <T extends { new(...args: any[]): {} }>(originalConstructor: T) {
        return class extends originalConstructor implements IIndexable, IDateable {
            private _: HTMLDivElement;
            private _imageElement: HTMLImageElement;
            private _titleElement: HTMLHeadingElement;
            private _descriptionElement: HTMLParagraphElement;
            _id: number;
            _date!: Date;

            constructor(...args: any[]) {
                super(...args);

                const clonedDiv: DocumentFragment = toDoItemTemplate.content.cloneNode(true) as DocumentFragment;
                this._id = args[3] ?? ToDoList.Instance.GenerateId();
                this._imageElement = clonedDiv.querySelector(".todo-item-icon")! as HTMLImageElement;
                this._titleElement = clonedDiv.querySelector(".todo-item-details_title")! as HTMLHeadingElement;
                this._descriptionElement = clonedDiv.querySelector(".todo-item-details_description")! as HTMLParagraphElement;
                (clonedDiv.querySelector(".todo-item-details_date")! as HTMLParagraphElement).textContent = `${this._date.toLocaleDateString()} ${this._date.toLocaleTimeString()}`;
                this.SetData(args[0], args[1], args[2]);

                (clonedDiv.querySelector(".edit-btn")! as HTMLButtonElement).addEventListener("click", async (): Promise<void> => {
                    const formData: FormData | null = await EditForm(this as unknown as ToDoItem);
                    if (formData == null) return;
                    const title: string = formData.get("todo-form-title")! as string;
                    const description: string = formData.get("todo-form-description")! as string;
                    const toDoType: ToDoType = +formData.get("todo-form-icon")! as ToDoType;
                    ToDoList.Instance.Edit(this._id, title, description, toDoType);
                    this.SetData(title, description, toDoType);
                });

                (clonedDiv.querySelector(".delete-btn")! as HTMLButtonElement).addEventListener("click", (): void => {
                    ToDoList.Instance.Delete(this._id);
                    toDoContainer.removeChild(this._);
                });

                toDoContainer.appendChild(clonedDiv);
                this._ = toDoContainer.querySelector(".todo-item:last-child")! as HTMLDivElement;
            }

            private SetData(title?: string, description?: string, toDoType?: ToDoType): void {
                if (toDoType || toDoType === 0) this._imageElement.src = `./../../img/${toDoType}.png`;
                if (title) this._titleElement.textContent = title;
                if (description) this._descriptionElement.textContent = description;
            }
        };
    };
}