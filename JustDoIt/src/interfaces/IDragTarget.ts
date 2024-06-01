export default interface IDragTarget {
    dragOverHandler(event: DragEvent): void;
    dragDropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
};