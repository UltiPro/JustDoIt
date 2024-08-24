import ToDoList from "../models/ToDoList";
import { ToDoType } from "../enums/ToDoType";
import IIndexable from "../interfaces/IIndexable";
import IDateable from "../interfaces/IDateable";
import IDraggable from "../interfaces/IDraggable";
import { EditForm } from "../utils/FormModal";
import ToDoItem from "../models/ToDoItem";

const toDoContainer: HTMLDivElement = document.getElementById("todo-container")! as HTMLDivElement;
const toDoItemTemplate: HTMLTemplateElement = document.getElementById("todo-item-template")! as HTMLTemplateElement;
let toDoItemDivDragged: HTMLDivElement | null = null;

export default function BuildToDoItem() {
    return function <T extends { new(...args: any[]): {} }>(originalConstructor: T) {
        return class extends originalConstructor implements IIndexable, IDateable, IDraggable {
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
                this._.setAttribute("data-item-id", this._id.toString());
                this._.addEventListener("dragstart", this.dragStartHandler.bind(this));
                this._.addEventListener("drop", this.dropHandler.bind(this));
                this._.addEventListener("dragend", this.dragEndHandler.bind(this));
                this._.addEventListener("dragover", this.dragOverHandler.bind(this));
                this._.addEventListener("dragleave", this.dragLeaveHandler.bind(this));
            }

            private SetData(title?: string, description?: string, toDoType?: ToDoType): void {
                if (toDoType || toDoType === 0) this._imageElement.src = `./../../img/${toDoType}.png`;
                if (title) this._titleElement.textContent = title;
                if (description) this._descriptionElement.textContent = description;
            }

            public dragStartHandler(event: DragEvent): void {
                toDoItemDivDragged = event.target as HTMLDivElement;
                toDoContainer.querySelectorAll(".todo-item").forEach(toDoItemDivElement => {
                    if (this._ === toDoItemDivElement) return;
                    toDoItemDivElement.classList.add("todo-item-dragover_default");
                });
            }

            public dropHandler(event: DragEvent): void {
                event.preventDefault();
                if (this._ === toDoItemDivDragged) return;
                toDoContainer.insertBefore(toDoItemDivDragged!, this._);
                ToDoList.Instance.RelocateObjById(toDoItemDivDragged!.getAttribute("data-item-id") as unknown as number, this._.getAttribute("data-item-id") as unknown as number);
            }

            public dragEndHandler(_: DragEvent): void {
                toDoItemDivDragged = null;
                toDoContainer.querySelectorAll(".todo-item").forEach(toDoItemDivElement => {
                    toDoItemDivElement.classList.remove("todo-item-dragover_default", "todo-item-dragover");
                });
            }

            public dragOverHandler(event: DragEvent): void {
                event.preventDefault();
                if (this._ === toDoItemDivDragged) return;
                this._.classList.add("todo-item-dragover");
            }

            public dragLeaveHandler(_: DragEvent): void {
                this._.classList.remove("todo-item-dragover");
            }
        };
    };
}