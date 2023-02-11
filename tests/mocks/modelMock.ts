import { IModel, IPropertyDatabase } from "../../src/model";
import { PropertyDatabase } from "../../src/propertyDatabase";
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