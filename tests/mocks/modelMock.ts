import { IModel, IPropertyDatabase } from "../../model";
import { PropertyDatabase } from "../../propertyDatabase";
import { pdb } from "./propertyDatabaseMock";

const propertyDatabase: IPropertyDatabase = {
    executeUserFunction: function <TResult, TOptions>(code: ((pdb: PropertyDatabase, tag?: TOptions | undefined) => TResult) | string, tag?: TOptions | undefined): Promise<TResult> {
        return new Promise<TResult>((resolve) => {
            const userFunction = typeof code === "function"
                ? code
                : eval(code + " userFunction");

            const result = userFunction(pdb, tag);

            resolve(result);
        })
    }
}

export const model: IModel = {
    getPropertyDb: () => {
        return propertyDatabase;
    }
}