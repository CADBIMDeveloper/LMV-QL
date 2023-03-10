export type PropertyDatabase = {
    findRootNodes(): number[];

    findParent(dbId: number): number | null;

    enumAttributes(callBack: (attrId: number, attrDef: AttributeDefinition) => void): void;

    enumObjectProperties(dbId: number, callBack: (attrId: number, attrValueId: number) => void): boolean | void;

    getAttrValue(attrId: number, attrValueId: number): string | number;

    enumObjects(callBack: (dbId: number) => void): void;

    getNodeNameAndChildren(query: { dbId: number }): { dbId: number, parent: number }[] | undefined;
}

export type AttributeDefinition = {
    category: string;
    name: string;
    dataType: number;
    displayName: string | null;
    dataTypeContext: string | null;
    precision: number;
}