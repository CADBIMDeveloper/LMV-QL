import { PropertyDatabase } from "./propertyDatabase";

export interface IModel {
    getPropertyDb(): IPropertyDatabase;
}

export interface IPropertyDatabase {
    executeUserFunction<TResult, TOptions>(fn: (pdb: PropertyDatabase, tag?: TOptions) => TResult, tag?: TOptions): Promise<TResult>;
}