import { IInstanceTree, IModel, IPropertyDatabase } from "../../model";
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

const instanceTree: IInstanceTree = {
    getRootId: function (): number {
        return pdb.findRootNodes()[0];
    },

    enumNodeChildren: function (node: number, callback: (dbId: number) => boolean | void, recursive?: boolean | undefined): void {
        callback(node);

        const children = (pdb.getNodeNameAndChildren({ dbId: node }) || []).map(x => x.dbId);

        for (const child of children) {
            if (recursive)
                this.enumNodeChildren(child, callback, recursive);
            else
                callback(child);
        }
    }
}

export const model: IModel = {
    getPropertyDb: () => {
        return propertyDatabase;
    },

    getInstanceTree: () => {
        return instanceTree;
    }
}