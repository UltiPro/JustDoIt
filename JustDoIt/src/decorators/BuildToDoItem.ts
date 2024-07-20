import ToDoList from "../ToDoList";
import { ToDoType } from "../enums/ToDoType";
import { EditForm } from "../utils/FormModal";

const toDoContainer: HTMLDivElement = document.getElementById("todo-container")! as HTMLDivElement;
const toDoItemTemplate: HTMLTemplateElement = document.getElementById("todo-item-template")! as HTMLTemplateElement;

export default function BuildToDoItem(id: number) {
    return function <T extends { new(...args: any[]): {} }>(originalConstructor: T) {
        return class extends originalConstructor {
            private _: HTMLDivElement;
            private _image: HTMLImageElement;
            private _title: HTMLHeadingElement;
            private _description: HTMLParagraphElement;

            constructor(...args: any[]) {
                super();

                const clonedDiv: DocumentFragment = toDoItemTemplate.content.cloneNode(true) as DocumentFragment;
                this._image = clonedDiv.querySelector(".todo-item-icon")! as HTMLImageElement;
                this._title = clonedDiv.querySelector(".todo-item-details_title")! as HTMLHeadingElement;
                this._description = clonedDiv.querySelector(".todo-item-details_description")! as HTMLParagraphElement;
                this.SetData(args[2], args[0], args[1]);

                (clonedDiv.querySelector(".edit-btn")! as HTMLButtonElement).addEventListener("click", async (): Promise<void> => {
                    const formData: FormData | null = await EditForm();
                    if (formData == null) return;
                    const title: string = formData.get("todo-form-title")! as string;
                    const description: string = formData.get("todo-form-description")! as string;
                    const toDoType: ToDoType = +formData.get("todo-form-icon")! as ToDoType;
                    ToDoList.Instance.Edit(id, title, description, toDoType);
                    this.SetData(toDoType ?? null, title ?? null, description ?? null);
                });

                (clonedDiv.querySelector(".delete-btn")! as HTMLButtonElement).addEventListener("click", (): void => {
                    ToDoList.Instance.Delete(id);
                    toDoContainer.removeChild(this._);
                });

                toDoContainer.appendChild(clonedDiv);
                this._ = toDoContainer.querySelector("div:last-child")! as HTMLDivElement;
            }

            private SetData(img?: number, title?: string, description?: string): void {
                if (img) this._image.src = `./../../img/${img}.png`;
                if (title) this._title.textContent = title;
                if (description) this._description.textContent = description;
            }
        };
    };
};