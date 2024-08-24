import ToDoList from "../models/ToDoList";
import ToDoItem from "../models/ToDoItem";

const toDoModal = document.getElementById("modal")! as HTMLDivElement;
const toDoForm = document.getElementById("todo-form")! as HTMLFormElement;

const toDoForm_h2: HTMLHeadingElement = toDoModal.querySelector("h2")! as HTMLHeadingElement;
const toDoForm_title: HTMLInputElement = toDoForm.querySelector("#todo-form-title")! as HTMLInputElement;
const toDoForm_description: HTMLInputElement = toDoForm.querySelector("#todo-form-description")! as HTMLInputElement;
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
    ToDoList.Instance.Add(new ToDoItem(toDoForm_title.value, toDoForm_description.value, +(toDoForm.querySelector("input[name='todo-form-icon']:checked")! as HTMLInputElement).value));
    toDoModal.style.display = "none";
}

export async function EditForm(toDoItem: ToDoItem): Promise<FormData | null> {
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
                toDoModal.style.display = "none";
            }
        }, { once: true });
        toDoForm.reset();
        toDoForm_title.value = toDoItem.Title;
        toDoForm_description.value = toDoItem.Description;
        (toDoForm.querySelector(`#todo-form-icon-${toDoItem.ToDoType}`) as HTMLInputElement).checked = true;
        toDoModal.style.display = "block";
    });
}