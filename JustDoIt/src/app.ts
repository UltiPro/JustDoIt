const toDoItemTemplate = document.getElementById("todo-item-template")! as HTMLTemplateElement;
const toDoContainer = document.getElementById("todo-container")! as HTMLDivElement;
const toDoModal = document.getElementById("modal")! as HTMLDivElement;

(document.getElementById("add-btn")! as HTMLButtonElement).addEventListener("click", () => toDoModal.style.display = 'block');

(document.getElementById("close-btn")! as HTMLButtonElement).addEventListener("click", () => toDoModal.style.display = 'none');

window.addEventListener("click", (e: Event) => {
    if (e.target == toDoModal) toDoModal.style.display = 'none';
});

