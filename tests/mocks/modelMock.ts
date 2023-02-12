import { IModel, IPropertyDatabase } from "../../model";
import { PropertyDatabase } from "../../propertyDatabase";
import { pdb } from "./propertyDatabaseMock";

const propertyDatabase: IPropertyDatabase = {
    executeUserFunction: function <TResult, TOptions>(fn: (pdb: PropertyDatabase, tag?: TOptions | undefined) => TResult, tag?: TOptions | undefined): Promise<TResult> {
        return new Promise<TResult>((resolve) => {
            const result = fn(pdb, tag);

            resolve(result);
        })
    }
}

export const model: IModel = {
    getPropertyDb: () => {
        return propertyDatabase;
    }
}