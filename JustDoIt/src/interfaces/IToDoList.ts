export default interface IToDoList<T> {
    list: T[];

    create(item: T): void;
    remove(item: T): void;
    remove(id: number): void;
    update(item: T): void;
    detail(id: number): void;
    clear(): void;
}