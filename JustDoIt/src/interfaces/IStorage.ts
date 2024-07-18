export default interface IStorage<T extends object> {
    Save(): void;
    Load(): T[];
    Clear(): void;
    Add(obj: T): void;
    Edit(obj: T): void;
    Delete(id: number): void;
};