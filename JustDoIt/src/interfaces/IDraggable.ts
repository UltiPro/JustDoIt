export interface IDraggable {
    dragStartHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
    dragOverHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}