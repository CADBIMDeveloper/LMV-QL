import { PropertyDatabase } from "./propertyDatabase";

export interface IModel {
    getPropertyDb(): IPropertyDatabase;
}

export interface IPropertyDatabase {
    executeUserFunction<T>(fn: (pdb: PropertyDatabase, tag?: any) => T): Promise<T>;
}