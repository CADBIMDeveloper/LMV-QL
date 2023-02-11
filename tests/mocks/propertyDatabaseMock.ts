import { PropertyDatabase, AttributeDefinition } from "../../src/propertyDatabase";

export const pdb: PropertyDatabase = {
    findParent: function (dbId: number): number | null {
        return 2 <= dbId && dbId <= 4 ? dbId - 1 : null;
    },
    enumAttributes: function (callBack: (attrId: number, attrDef: AttributeDefinition) => void): void {
        callBack(1, { name: "name", category: "__name__", dataType: 20, displayName: null });
        callBack(2, { name: "element type property", category: "props", dataType: 20, displayName: null });
        callBack(3, { name: "element property", category: "props", dataType: 20, displayName: null });
    },
    enumObjectProperties: function (dbId: number, callBack: (attrId: number, attrValueId: number) => void): void {
        if (dbId === 1) // root
            callBack(1, 1);

        if (dbId === 2) // Category
            callBack(1, 2);

        if (dbId === 3) { // SubCategory
            callBack(1, 3);
            callBack(2, 5);
        }

        if (dbId === 4) { // Element
            callBack(1, 4);
            callBack(3, 6);
        }
    },
    getAttrValue: function (attrId: number, attrValueId: number): string | number {
        if (attrId === 1) { // name
            switch (attrValueId) {
                case 1:
                    return "root";
                case 2:
                    return "Category";
                case 3:
                    return "SubCategory";
                case 4:
                    return "Element";

                default:
                    throw new Error("Values is not supported");
            }
        }
        if (attrId === 2 && attrValueId === 5)
            return 1.3;

        if (attrId === 3 && attrValueId === 6)
            return 5.7;

        throw new Error('Values is not supported');
    },
    enumObjects: function (callBack: (dbId: number) => void): void {
        for (let i = 1; i <= 4; ++i)
            callBack(i);
    }
}