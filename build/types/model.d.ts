import { PropertyDatabase } from "./propertyDatabase";
export interface IModel {
    getPropertyDb(): IPropertyDatabase;
}
export interface IPropertyDatabase {
    executeUserFunction<TResult, TOptions>(code: ((pdb: PropertyDatabase, tag?: TOptions) => TResult) | string, tag?: TOptions): Promise<TResult>;
}
