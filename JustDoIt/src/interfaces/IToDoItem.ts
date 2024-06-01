export default interface IToDoItem {
    show(): void;
    modify(title: string, description: string, deadLine: Date): void;
}