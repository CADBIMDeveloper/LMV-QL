import { PropertyDatabase } from "./propertyDatabase";

export interface IModel {
    getPropertyDb(): IPropertyDatabase;

    getInstanceTree(): IInstanceTree;
}

export interface IPropertyDatabase {
    executeUserFunction<TResult, TOptions>(code: ((pdb: PropertyDatabase, tag?: TOptions) => TResult) | string, tag?: TOptions): Promise<TResult>;
}

export interface IInstanceTree {
    getRootId(): number;

    enumNodeChildren(node: number, callback: (dbId: number) => void | boolean, recursive?: boolean): void
}

export interface IDocumentNode {
    getFullPath(urn: string): string;
    getAcmSessionId(url: string): string | undefined;
}

export interface IBubbleNode {
    isSVF2(): boolean;
    findPropertyDbPath(): string;
}