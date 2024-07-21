import ToDoList from "../models/ToDoList";
import { ToDoType } from "../enums/ToDoType";
import IIndexable from "../interfaces/IIndexable";
import { EditForm } from "../utils/FormModal";

const toDoContainer: HTMLDivElement = document.getElementById("todo-container")! as HTMLDivElement;
const toDoItemTemplate: HTMLTemplateElement = document.getElementById("todo-item-template")! as HTMLTemplateElement;

export default function BuildToDoItem() {
    return function <T extends { new(...args: any[]): {} }>(originalConstructor: T) {
        return class extends originalConstructor implements IIndexable {
            private _: HTMLDivElement;
            private _imageElement: HTMLImageElement;
            private _titleElement: HTMLHeadingElement;
            private _descriptionElement: HTMLParagraphElement;
            _id: number;

            constructor(...args: any[]) {
                super();

                const clonedDiv: DocumentFragment = toDoItemTemplate.content.cloneNode(true) as DocumentFragment;
                this._id = ToDoList.Instance.GenerateId();
                this._imageElement = clonedDiv.querySelector(".todo-item-icon")! as HTMLImageElement;
                this._titleElement = clonedDiv.querySelector(".todo-item-details_title")! as HTMLHeadingElement;
                this._descriptionElement = clonedDiv.querySelector(".todo-item-details_description")! as HTMLParagraphElement;
                this.SetData(args[2], args[0], args[1]);

                (clonedDiv.querySelector(".edit-btn")! as HTMLButtonElement).addEventListener("click", async (): Promise<void> => {
                    const formData: FormData | null = await EditForm();
                    if (formData == null) return;
                    const title: string = formData.get("todo-form-title")! as string;
                    const description: string = formData.get("todo-form-description")! as string;
                    const toDoType: ToDoType = +formData.get("todo-form-icon")! as ToDoType;
                    ToDoList.Instance.Edit(this._id, title, description, toDoType);
                    this.SetData(toDoType, title, description);
                });

                (clonedDiv.querySelector(".delete-btn")! as HTMLButtonElement).addEventListener("click", (): void => {
                    ToDoList.Instance.Delete(this._id);
                    toDoContainer.removeChild(this._);
                });

                toDoContainer.appendChild(clonedDiv);
                this._ = toDoContainer.querySelector("div:last-child")! as HTMLDivElement;
            }

            private SetData(img?: number, title?: string, description?: string): void {
                if (img || img === 0) this._imageElement.src = `./../../img/${img}.png`;
                if (title) this._titleElement.textContent = title;
                if (description) this._descriptionElement.textContent = description;
            }
        };
    };
}