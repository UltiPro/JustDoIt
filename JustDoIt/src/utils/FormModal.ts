import ToDoList from "../models/ToDoList";
import ToDoItem from "../models/ToDoItem";
import { ToDoType } from "../enums/ToDoType";

const toDoModal = document.getElementById("modal")! as HTMLDivElement;
const toDoForm = document.getElementById("todo-form")! as HTMLFormElement;

const toDoForm_h2: HTMLHeadingElement = toDoModal.querySelector("h2")! as HTMLHeadingElement;
const toDoForm_button: HTMLButtonElement = toDoForm.querySelector("button")! as HTMLButtonElement;

export function InitFormModal(): void {
    (document.getElementById("add-btn")! as HTMLButtonElement).addEventListener("click", (): void => {
        toDoForm_h2.textContent = "New Task";
        toDoForm_button.textContent = "Add";
        toDoForm.addEventListener("submit", Add);
        toDoForm.reset();
        toDoModal.style.display = "block";
    });

    (document.getElementById("close-btn")! as HTMLButtonElement).addEventListener("click", (): string => toDoModal.style.display = "none");

    window.addEventListener("dblclick", (e: Event): void => {
        if (e.target == toDoModal) toDoModal.style.display = "none";
    });
}

function Add(e: SubmitEvent): void {
    e.preventDefault();
    const formData: FormData = new FormData(toDoForm);
    ToDoList.Instance.Add(new ToDoItem(
        formData.get("todo-form-title")! as string,
        formData.get("todo-form-description")! as string,
        +formData.get("todo-form-icon")! as ToDoType));
    toDoModal.style.display = 'none';
}

export async function EditForm(): Promise<FormData | null> {
    toDoForm_h2.textContent = "Edit Task";
    toDoForm_button.textContent = "Edit";
    toDoForm.removeEventListener("submit", Add);
    return new Promise((resolve, reject): void => {
        toDoForm.addEventListener("submit", (e: SubmitEvent): void => {
            e.preventDefault();
            try {
                resolve(new FormData(toDoForm));
            }
            catch {
                reject(null);
            }
            finally {
                toDoModal.style.display = 'none';
            }
        }, { once: true });
        toDoForm.reset();
        toDoModal.style.display = "block";
    });
}