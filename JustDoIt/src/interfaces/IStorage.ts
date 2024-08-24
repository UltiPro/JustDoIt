export default interface IStorage<T extends object> {
    Save(): void;
    Load(): void;
    Clear(): void;
    Add(obj: T): void;
    Edit(id: number, ...args: any[]): void;
    Delete(id: number): void;
    RelocateObjById(objId: number, toObjId: number): void;
}