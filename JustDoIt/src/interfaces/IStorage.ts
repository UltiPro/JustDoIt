export default interface IStorage<T extends object> {
    Save(): void;
    Load(): T[];
}